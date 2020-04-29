import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import CreatableSelect from 'react-select/creatable'
import firebase from "gatsby-plugin-firebase"
import ReactQuill from 'react-quill'

import SEO from "../components/seo"
import Category from "../components/category"
import ImageFluid from "../components/image-fluid"
import ImageFixed from "../components/image-fixed"
import StarRating from "../components/starrating"
import * as Constants from '../constants'
import { useCompanies } from "../hooks/use-companies"
import { getUser } from "../utils/auth"

const createCompany = (label) => (
    { value: label, label: label }
)
const components = {
    DropdownIndicator: null,
}

// https://restcountries.eu/rest/v2/alpha?codes=can&fields=flag


export default function WriteReview() {
    const { uid, displayName } = getUser()
    const { setValue, register, errors, handleSubmit } = useForm()
    // Submit button
    const onSubmit = formData => {
        console.log("data:", formData)
        // check if entered new company
        if (formData.company.value === formData.company.label) {
            firebase.firestore().collection('companies')
                .add({ name: formData.company.label, logo: '', website: '' })
                .then(ref => {
                    updateFirestore(formData, ref.id)
                })
                .catch(error => {
                    alert("Error: " + error)
                })
        } else {
            updateFirestore(formData, formData.company.value)
        }
    }
    // save the Review in the database
    const updateFirestore = (dataObject, companyId) => {
        dataObject = Object.assign(dataObject, {
            categories: company.categories.map((category) => (
                firebase.firestore().doc(`categories/${category.id}`)
            )),
            company: firebase.firestore().doc(`companies/${companyId}`),
            created: firebase.firestore.FieldValue.serverTimestamp(),
            helpful: [],
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
                console.log("sent to firestore:", ref.id)
                // Update the 'companies' collection with this latest review
                firebase.firestore().collection('companies').doc(companyId)
                    .update({
                        reviews: firebase.firestore.FieldValue.arrayUnion(ref),
                    })
                    .then(() => {
                        console.log("updated:", companyId)
                        navigate(
                            "/form-submitted",
                            {
                                state: { username: displayName },
                                replace: true,
                            }
                        )
                    })
                    .catch(error => {
                        alert("Error: " + error)
                    })
            })
            .catch(error => {
                alert("Error: " + error)
            })
    }
    // React-quill Editor
    const [content, setContent] = useState('')
    const handleChangeContent = newValue => {
        setValue('content', newValue)
        setContent(newValue)
    }

    // Companies
    const { allCompanies } = useCompanies()
    const defaultCompanies = allCompanies.nodes.map((node) => (
        { value: node.id, label: node.name }
    ))
    const [companyOptions, setCompanyOptions] = useState(defaultCompanies)
    const [company, setCompany] = useState(null)

    const handleChangeCompany = selectedValue => {
        setValue('company', selectedValue, true)
        if (selectedValue) {
            const selectedCompany = allCompanies.nodes.find(x => x.id === selectedValue.value)
            if (selectedCompany) {
                selectedCompany.imgLogo = {
                    imgName: selectedCompany.logo,
                    imgAlt: `${selectedCompany.name} Logo`,
                    imgClass: ""
                }
                setCompany(selectedCompany)
            }
        } else { setCompany(null) }
    }
    const handleCreateCompany = newValue => {
        const newOption = createCompany(newValue)
        setValue('company', newOption, true)
        // add the new Company to existing list
        setCompanyOptions([...companyOptions, newOption])
    }
    // Tags
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
    }, [register])

    const imgAds = {
        imgName: "ads_digital_ocean.png",
        imgAlt: "Digital Ocean Ad",
        imgClass: "w-64 h-full"
    }

    return (
        <>
            <SEO
                title="Write Review"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <div className="bg-gray-200">

                <div className="container mx-auto bg-white">

                    <div id="wrapper" className="flex flex-col lg:flex-row">

                        <div id="main" className="lg:w-3/4 flex flex-col px-4 lg:px-0 pt-8 mb-12">

                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Company Heading */}
                                <div className="flex flex-col lg:flex-row">
                                    <div className="lg:w-3/5 flex flex-col lg:ml-10">
                                        {/* Categories */}
                                        <div className="flex">
                                            {company &&
                                                <Category categories={company.categories} useLink={false} className="inline-block bg-gray-100 border border-gray-200 rounded-md px-2 text-xs font-semibold text-black tracking-tight mr-1" />
                                            }
                                        </div>
                                        <div className="mt-2">
                                            <CreatableSelect
                                                name="company"
                                                placeholder="Select Company..."
                                                //value={companyValue}
                                                options={companyOptions}
                                                styles={Constants.customStyles}
                                                onChange={handleChangeCompany}
                                                onCreateOption={handleCreateCompany}
                                                isClearable
                                            />
                                            {errors.company && <span className="text-red-400 text-md">{errors?.company?.message}</span>}
                                        </div>
                                        {/* Logo */}
                                        <div className="flex pl-4 my-6">
                                            {company &&
                                                <a href={`${company.website}`} title={company.name} rel="noopener noreferrer" target="_blank">
                                                    <ImageFixed props={company.imgLogo} />
                                                </a>}
                                        </div>
                                        {/* Marketplace & Website */}
                                        <div className="flex">
                                            <h6 className="text-gray-500 text-xs tracking-tight uppercase">
                                                {company && company.marketplace.join(', ')}
                                            </h6>
                                            {company &&
                                                <a href={company.website} rel="noopener noreferrer" target="_blank" className="text-xs text-blue-500 tracking-tight font-extrabold pl-3">{company.name}</a>}
                                        </div>
                                    </div>
                                </div>

                                <hr id="reviews" className="border-b border-gray-400 opacity-25 mt-4 py-0" />

                                {/* Reviews */}
                                <div className="flex flex-col lg:px-10 py-4">
                                    <div className="flex flex-col">
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
                                            ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                            className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
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
                                            components={components}
                                            inputValue={inputValue}
                                            isClearable
                                            isMulti
                                            menuIsOpen={false}
                                            styles={Constants.customStyles}
                                            onChange={handleTagChange}
                                            onInputChange={handleTagInputChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type something and press enter..."
                                            value={tags}
                                        />

                                        <div className="text-black mt-8">
                                            <button
                                                type="submit"
                                                value="Submit"
                                                className="mx-auto lg:mx-0 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full py-4 px-8 shadow opacity-75 text-white gradient">
                                                Submit
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Ads */}
                        <div id="sidebar" className="lg:w-1/4 flex flex-col py-10 lg:pb-0 bg-gray-200 relative">
                            <div className="flex mx-auto">
                                <a href="https://www.digitalocean.com" rel="noopener noreferrer" target="_blank">
                                    <ImageFluid props={imgAds} />
                                </a>
                            </div>
                            <div className="flex mx-auto ml-10 lg:mt-32 fixed">
                                <div className="flex">
                                    reviews
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
