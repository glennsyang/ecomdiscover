import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { FaExternalLinkAlt } from 'react-icons/fa'
import firebase from "gatsby-plugin-firebase"
import ReactQuill from 'react-quill'
// Don't forget to add: .ql-editor { min-height: 18em; to quill.snow.css
// Add state.companyId, to the useEffect dependencies
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

import SEO from "../components/seo"
import Category from "../components/category"
import Marketplace from "../components/marketplace"
import ImageFixed from "../components/image-fixed"
import StarRating from "../components/starrating"
import Advert from "../components/advert"
import Toast from "../components/toast"
import CompanyModal from "../components/companyModal"
import * as Constants from '../constants'
import { useCompanies } from "../hooks/useCompanies"
import { useTags } from "../hooks/useTags"
import { getUser, isBlocked } from "../utils/auth"

//const components = { DropdownIndicator: null, }
const createCompany = (label) => ({ value: label, label: label })

// save the Review in the database
const updateFirestore = (uid, displayName, dataObject, company, companyId, companyName, setToast) => {
    dataObject = Object.assign(dataObject, {
        categories: company.categories.map((category) => (
            firebase.firestore().doc(`categories/${category.id}`)
        )),
        company: firebase.firestore().doc(`companies/${companyId}`),
        created: firebase.firestore.FieldValue.serverTimestamp(),
        updated: firebase.firestore.FieldValue.serverTimestamp(),
        helpful: [],
        published: true,
        rating: dataObject.rating ? Number(dataObject.rating) : 0,
        tags: dataObject.tags ? dataObject.tags.map((tag) => (
            tag.label
        )) : [],
        uid: firebase.firestore().collection('users').doc(uid),
    })
    firebase
        .firestore().collection('reviews')
        .add(dataObject)
        .then(ref => {
            console.log("Created new review:", ref.id)
            // Update the 'companies' collection with this latest review
            firebase.firestore().collection('companies').doc(companyId)
                .update({ reviews: firebase.firestore.FieldValue.arrayUnion(ref) })
                .then(() => {
                    console.log("Updated Company:", companyId)
                    // Update the 'users' collection with this latest review
                    firebase.firestore().collection('users').doc(uid)
                        .update({ reviews: firebase.firestore.FieldValue.arrayUnion(ref) })
                        .then(() => {
                            console.log("Updated User:", uid)
                            navigate(
                                "/form-submitted",
                                {
                                    state: { username: displayName },
                                    replace: true,
                                }
                            )
                        })
                        .catch(error => {
                            const toastProperties = {
                                id: Math.floor((Math.random() * 101) + 1),
                                title: 'Error',
                                description: `There was an error in updating User: ${uid} with your new review. Reason: ${error}.`,
                                color: 'red',
                            }
                            setToast(toastProperties)
                        })
                })
                .catch(error => {
                    const toastProperties = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Error',
                        description: `There was an error in updating Company: ${companyName} with your new review. Reason: ${error}.`,
                        color: 'red',
                    }
                    setToast(toastProperties)
                })
        })
        .catch(error => {
            const toastProperties = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Error',
                description: `There was an error in creating your new review for Company: ${companyName}. Reason: ${error}.`,
                color: 'red',
            }
            setToast(toastProperties)
        })
}

export default function WriteReview({ location }) {
    const { uid, displayName } = getUser()
    const [showModal, setShowModal] = useState(false)
    const [toast, setToast] = useState()
    const { setValue, register, errors, handleSubmit } = useForm()
    const [isUserActive, setIsUserActive] = useState(false)
    const { state } = location
    const titleRef = useRef()
    // Submit button
    const onSubmit = formData => {
        console.log("data:", formData)
        // check if entered new company
        if (formData.company.value === formData.company.label) {
            firebase.firestore().collection('companies')
                .add({ name: formData.company.label, logo: '', website: '' })
                .then(ref => {
                    updateFirestore(uid, displayName, formData, company, ref.id, formData.company.label, setToast)
                })
                .catch(error => {
                    const toastProperties = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Error',
                        description: `There was an error in creating new Company: ${formData.company.label}. Reason: ${error}.`,
                        color: 'red',
                    }
                    setToast(toastProperties)
                })
        } else {
            updateFirestore(uid, displayName, formData, company, formData.company.value, formData.company.label, setToast)
        }
    }
    // React-quill Editor
    const [content, setContent] = useState('')
    const handleChangeContent = newValue => {
        setValue('content', newValue)
        setContent(newValue)
    }
    // Modal
    const showCompanyModal = () => {
        //e.preventDefault()
        setShowModal(!showModal)
    }
    const createCompanyModal = (modalData) => {
        setShowModal(!showModal)
        const newOption = { value: modalData.id, label: modalData.name }
        setValue('company', newOption, true)
        setCompanyValue(newOption)
        setCompanyOptions([...companyOptions, newOption])
        setCompany(modalData)
        setCompanyList([...companyList, modalData])
    }
    // Companies
    const { allCompanies } = useCompanies()
    const defaultCompanies = allCompanies.nodes.map((node) => (
        { value: node.id, label: node.name, created: node.created }
    ))
    const [companyList, setCompanyList] = useState(allCompanies.nodes)
    const [companyOptions, setCompanyOptions] = useState(defaultCompanies)
    const [companyValue, setCompanyValue] = useState()
    const [company, setCompany] = useState(null)

    const handleChangeCompany = selectedValue => {
        //console.log("selectedValue", selectedValue)
        setValue('company', selectedValue, true)
        setCompanyValue(selectedValue)
        if (selectedValue) {
            const selectedCompany = companyList.find(x => x.id === selectedValue.value)
            if (selectedCompany) {
                if (selectedCompany.logo) {
                    selectedCompany.imgLogo = {
                        imgName: selectedCompany.logo, imgAlt: `${selectedCompany.name} Logo`, imgClass: ""
                    }
                }
                setCompany(selectedCompany)
            }
        } else { setCompany(null) }
    }

    // Tags
    const { allTags } = useTags()
    const defaultTags = allTags.nodes.map((node) => (
        { value: node.id, label: node.tag }
    ))
    const [tagOptions, setTagOptions] = useState(defaultTags)
    const [tags, setTags] = useState([])
    const [inputValue, setInputValue] = useState('')
    const handleTagChange = (value) => {
        setValue('tags', value)
        setTags(value)
    }
    const handleTagInputChange = (inputValue) => {
        setInputValue(inputValue)
    }
    const handleKeyDown = event => {
        if (!inputValue) return
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                // Check if tag already exists
                if (tags.find(tag => tag.value.toLowerCase() === inputValue.toLowerCase())) {
                    event.preventDefault()
                    return
                }
                setInputValue('')
                const newOption = createCompany(inputValue)
                setValue('tags', [...tags, newOption])
                setTags([...tags, newOption])
                setTagOptions([...tagOptions, newOption])
                event.preventDefault()
                break
            default:
                break
        }
    }

    useEffect(() => {
        register({ name: "company" }, { required: { value: true, message: Constants.FIELD_REQUIRED } })
        register({ name: "content" }, { required: { value: true, message: Constants.FIELD_REQUIRED } })
        register({ name: "tags" })

        setIsUserActive(isBlocked())

        if (state.companyId) {
            const selectedCompany = companyList.find(x => x.id === state.companyId)
            if (selectedCompany.logo) {
                selectedCompany.imgLogo = {
                    imgName: selectedCompany.logo, imgAlt: `${selectedCompany.name} Logo`, imgClass: ""
                }
            }
            const selectedValue = { label: selectedCompany.name, value: selectedCompany.id }
            setValue('company', selectedValue, true)
            setCompanyValue(selectedValue)
            setCompany(selectedCompany)
            titleRef.current.focus()
        }

    }, [register, companyList, setValue])

    return (
        <>
            <SEO
                title={company ? `Write Review: ${company.name}` : `Write Review`}
                description={`${company?.name}: ${company?.blurb}`}
            />
            <div className="bg-gray-200">

                <div className="container mx-auto">

                    <div id="wrapper" className="flex flex-col lg:flex-row">

                        <main id="main" className="lg:w-3/4 flex flex-col px-4 lg:px-0 pt-6 pb-12 bg-white">

                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Company Heading */}
                                <div className="flex flex-col lg:flex-row">
                                    <div className="lg:w-3/4 flex flex-col lg:ml-10">
                                        {/* Categories */}
                                        <div className="flex">
                                            {company &&
                                                <Category categories={company.categories} useLink={false} className="inline-block bg-gray-100 border border-gray-200 rounded-md px-2 text-xs font-semibold text-black tracking-tight mr-1" />
                                            }
                                        </div>
                                        <div className="flex flex-col items-start md:flex-row">
                                            <Select
                                                name="company"
                                                placeholder="Select Company..."
                                                styles={Constants.customStyles}
                                                options={companyOptions}
                                                value={companyValue}
                                                onChange={handleChangeCompany}
                                                isClearable
                                                className="flex-1 w-full mt-2"
                                            />
                                            <button type="button" onClick={showCompanyModal} className="flex-none outline-none focus:outline-none py-3 px-1 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500 underline sm:no-underline sm:mx-4">
                                                New Company
                                            </button>
                                        </div>
                                        {errors.company && <span className="text-red-400 text-md">{errors?.company?.message}</span>}
                                        {/* Logo */}
                                        <div className="flex pl-4 my-6">
                                            {company &&
                                                <a href={`${company.website}`} title={company.name} rel="noopener noreferrer" target="_blank">
                                                    {company && company.imgLogo
                                                        ? <ImageFixed props={company.imgLogo} />
                                                        : <img src={company.logoURL} alt={`${company.name} Logo`} className="h-16 w-2/5 object-contain" />}
                                                </a>}
                                        </div>
                                        {/* Website & Marketplace */}
                                        <div className="flex items-center mt-6">
                                            {company && <a href={company.website} rel="noopener noreferrer" target="_blank"
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded inline-flex flex-shrink-0 items-center -m-1">
                                                <FaExternalLinkAlt size={18} className="mr-3" />
                                                Visit Website
                                            </a>}
                                            <div className="flex flex-wrap text-gray-500 text-xs tracking-tight uppercase ml-4">
                                                {company &&
                                                    company.marketplaces.map(marketplace => {
                                                        return <Marketplace key={marketplace.id} marketplace={marketplace} className={"h-4 m-1"} />
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr id="review" className="border-b border-gray-400 opacity-25 mt-4 py-0" />

                                {/* Review */}
                                <div className="flex flex-col lg:px-10 py-4">
                                    <div className="flex flex-col review-editor">
                                        <StarRating
                                            totalStars={5}
                                            name="rating"
                                            register={register}
                                            required
                                        />
                                        {errors.rating && <span className="text-red-400 text-md">{errors?.rating?.message}</span>}

                                        <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-4">Title</div>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Summarize your review or highlight an interesting detail"
                                            aria-label="Title of Review"
                                            className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                            ref={(e) => {
                                                register(e, { required: { value: true, message: Constants.FIELD_REQUIRED } })
                                                titleRef.current = e
                                            }}
                                        />
                                        {errors.title && <span className="text-red-400 text-md">{errors?.title?.message}</span>}

                                        <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-4">Review</div>
                                        <ReactQuill
                                            name="content"
                                            placeholder="By sharing your experiences you're helping businesses make better choices. Thank you!"
                                            value={content}
                                            onChange={handleChangeContent}
                                            modules={Constants.editorModules}
                                            formats={Constants.editorFormats}
                                            theme="snow"
                                        />
                                        {errors.content && <span className="text-red-400 text-md">{errors?.content?.message}</span>}

                                        <div className="block text-black lg:text-2xl text-xl font-bold mt-4">Tags</div>
                                        <CreatableSelect
                                            name="tags"
                                            //components={components}
                                            inputValue={inputValue}
                                            isClearable
                                            isMulti
                                            //menuIsOpen={false}
                                            styles={Constants.customTagStyles}
                                            onChange={handleTagChange}
                                            onInputChange={handleTagInputChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type something and press enter...Or, choose some from the list..."
                                            value={tags}
                                            options={tagOptions}
                                        />
                                        {isUserActive ?
                                            <div className="text-black mt-8">
                                                <button
                                                    type="submit"
                                                    value="Submit"
                                                    className="mx-auto lg:mx-0 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full py-4 px-8 shadow opacity-75 text-white gradient">
                                                    Submit
                                                </button>
                                            </div>
                                            : ''}
                                    </div>
                                </div>
                            </form>
                        </main>

                        {/* Ads */}
                        <aside id="sidebar" className="lg:w-1/4 flex flex-col pt-4 lg:py-4 mb-6 lg:pt-20 bg-gray-200 h-full sticky top-0 right-0 overflow-y-scroll lg:pl-4">
                            <Advert />
                        </aside>
                    </div>
                    <CompanyModal
                        show={showModal}
                        onClose={showCompanyModal}
                        onCreate={createCompanyModal}
                    />
                    <Toast
                        toastProps={toast}
                        position="bottom-right"
                        autoDelete={true}
                        autoDeleteTime={2500}
                    />
                </div>
            </div>
        </>
    )
}
