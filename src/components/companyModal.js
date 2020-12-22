import React, { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import Select from "react-select"
import firebase from "gatsby-plugin-firebase"
//import ReactQuill from 'react-quill'
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import { FaCamera } from 'react-icons/fa'
import * as Constants from '../constants'
import { useCategories } from "../hooks/useCategories"
import { useMarketplaces } from "../hooks/useMarketplaces"
import Toast from "../components/toast"
import Loader from "../components/loader"
import ProgressBar from "../components/progressbar"
import { getUser } from "../utils/auth"

export default function CompanyModal(props) {
    const { setValue, register, errors, handleSubmit } = useForm()
    const { uid } = getUser();
    const [isLoading, setIsLoading] = useState(false)
    const [toast, setToast] = useState()
    const { allMarketplaces } = useMarketplaces()
    const { allCategories } = useCategories()

    const onClose = () => {
        setSelectedFile(null)
        setErrorFile(null)
        setProgress(null)
        setContent('')
        setToast()
        props.onClose && props.onClose()
    }
    // Categories Selector
    const defaultCategories = allCategories.nodes.map((node) => (
        { value: node.id, label: node.name }
    ))
    const handleMultiChange = selectedOption => {
        setValue('categories', selectedOption)
    }
    // React-quill Editor
    const [content, setContent] = useState('')
    const handleChangeContent = newValue => {
        setValue('content', newValue)
        setContent(newValue)
    }
    // File Upload
    const fileInput = useRef()
    const [selectedFile, setSelectedFile] = useState(null)
    const [errorFile, setErrorFile] = useState(null)
    const [progress, setProgress] = useState(null)
    const handleSelectFile = (e) => {
        e.target.value = null
    }
    const handleUploadLogo = (e) => {
        e.preventDefault()
        const selected = fileInput.current.files[0]
        const fileSize = selected.size;
        if (selected && !Constants.IMAGE_FILE_TYPES.includes(selected.type)) {
            setSelectedFile(null)
            setErrorFile('*Please select an image file (png or jpeg)')
            const toastProperties = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Error',
                description: `File ${selected.name} is not valid. Please select an image file (png or jpeg)`,
                color: 'red',
                position: 'top-right'
            }
            setToast(toastProperties)
            return
        } else if (selected && fileSize > 1024 * 1024) {
            setSelectedFile(null)
            setErrorFile('*The allowed file size is 1MB.')
            const toastProperties = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Error',
                description: `File size is not valid. Please select an image file less than 1MB.`,
                color: 'red',
                position: 'top-right'
            }
            setToast(toastProperties)
            return
        } else {
            setSelectedFile(selected)
            setErrorFile('')
        }
    }
    // Submit button
    const onSubmit = modalData => {
        setIsLoading(true)
        // First, upload the logo to the Storage bucket, if exists
        if (selectedFile) {
            // Append current Date-Time to fileName to prevent duplicates
            const fileNameArr = selectedFile.name.split('.')
            const fileName = `company-images/${fileNameArr[0]}_${Date.now()}.${fileNameArr[1]}`
            const storageRef = firebase.storage().ref().child(fileName)
            storageRef.put(selectedFile).on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
                setProgress(percentage)
            }, (err) => {
                setIsLoading(false)
                const toastProperties = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in uploading the file ${selectedFile.name}. Reason: ${err}.`,
                    color: 'red',
                    position: 'top-right'
                }
                setToast(toastProperties)
            }, async () => {
                const companyLogoURL = await storageRef.getDownloadURL()
                createCompanyInFirestore(modalData, companyLogoURL)
            })
        } else {
            console.log("No logo attached")
            createCompanyInFirestore(modalData, "")
        }
    }
    // Create the Company in the Firestore db
    const createCompanyInFirestore = (modalData, companyLogoURL) => {
        firebase.firestore().collection('companies')
            .add({
                created: firebase.firestore.FieldValue.serverTimestamp(),
                updated: firebase.firestore.FieldValue.serverTimestamp(),
                uid: firebase.firestore().collection('users').doc(uid),
                blurb: modalData.blurb,
                content: modalData.content,
                categories: modalData.categories.map((category) => (
                    firebase.firestore().doc(`categories/${category.value}`)
                )),
                logo: "",
                logoURL: companyLogoURL,
                marketplaces: modalData.marketplaces.map((marketplace) => (
                    firebase.firestore().doc(`marketplaces/${marketplace}`)
                )),
                name: modalData.name,
                reviews: [],
                website: modalData.website,
            })
            .then(ref => {
                setIsLoading(false)
                // Modify return object to proper format
                modalData.id = ref.id
                modalData.marketplaces = modalData.marketplaces.map(countryCode => (
                    {
                        id: allMarketplaces.nodes.find(x => x.code === countryCode).id,
                        code: countryCode,
                        flag: allMarketplaces.nodes.find(x => x.code === countryCode).flag,
                        name: allMarketplaces.nodes.find(x => x.code === countryCode).name,
                    }
                ))
                modalData.categories = modalData.categories.map(category => (
                    { id: category.value, name: category.label }
                ))
                modalData.logo = ""
                modalData.logoURL = companyLogoURL
                props.onCreate(modalData)
            })
            .catch(error => {
                setIsLoading(false)
                const toastProperties = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in creating new Company: ${modalData.name}. Reason: ${error}.`,
                    color: 'red',
                }
                setToast(toastProperties)
            })
    }

    useEffect(() => {
        register({ name: "categories" }, { required: { value: true, message: Constants.FIELD_REQUIRED } })
        register({ name: "content" }, { required: { value: true, message: Constants.FIELD_REQUIRED } })

        return () => {
            setSelectedFile(null)
            setErrorFile(null)
            setProgress(null)
            setContent('')
            setToast()
        }
    }, [register])


    if (!props.show) { return null }
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                {isLoading
                    ? <Loader />
                    : <div className="relative w-auto lg:mt-16 lg:my-6 mx-1 lg:mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-2 lg:border-0 border-gray-300 shadow-inner lg:shadow-lg rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/*header*/}
                                <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="lg:text-2xl text-xl font-semibold pr-2 lg:pr-10">
                                        New Company, Tool or Service
                                    </h3>
                                    <button
                                        type="button"
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={onClose}>
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-2 lg:px-6 flex-1 company-editor">
                                    <div className="block text-left text-black lg:text-xl text-lg font-bold">Name</div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Company, Tool or Service Name"
                                        aria-label="Enter the Company, Tool or Service Name"
                                        ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                        className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                    />
                                    {errors.name && <span className="text-red-400 text-md">{errors?.name?.message}</span>}

                                    <div className="block text-left text-black lg:text-xl text-lg font-bold mt-2">Blurb</div>
                                    <input
                                        type="text"
                                        name="blurb"
                                        placeholder="Short blurb about the Company, Tool or Service"
                                        aria-label="Enter the blurb about Company, Tool or Service Name"
                                        ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                        className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                    />
                                    {errors.blurb && <span className="text-red-400 text-md">{errors?.blurb?.message}</span>}

                                    <div className="block text-left text-black lg:text-xl text-lg font-bold mt-2">Description</div>
                                    <ReactQuill
                                        name="content"
                                        placeholder="A longer description about the Company, Tool or Service..."
                                        value={content}
                                        onChange={handleChangeContent}
                                        modules={Constants.editorModules}
                                        formats={Constants.editorFormats}
                                        theme="snow"
                                    />
                                    {errors.content && <span className="text-red-400 text-md">{errors?.content?.message}</span>}

                                    <div className="block text-left text-black lg:text-xl text-lg font-bold mt-2">Website</div>
                                    <input
                                        type="text"
                                        name="website"
                                        placeholder="https://ww.example.com"
                                        aria-label="Enter the Website"
                                        ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                        className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                    />
                                    {errors.website && <span className="text-red-400 text-md">{errors?.website?.message}</span>}

                                    <div className="block text-left text-black lg:text-xl text-lg font-bold mt-2">Categories</div>
                                    <Select
                                        name="categories"
                                        placeholder="Select Categories..."
                                        options={defaultCategories}
                                        styles={Constants.customStyles}
                                        onChange={handleMultiChange}
                                        isMulti
                                    />
                                    {errors.categories && <span className="text-red-400 text-md">{errors?.categories?.message}</span>}
                                    <div className="block text-left text-black lg:text-xl text-lg font-bold mt-2">Marketplaces</div>
                                    <div className="flex-row justify-start text-black">
                                        {allMarketplaces.nodes.map((country) =>
                                            <React.Fragment key={country.id}>
                                                <input
                                                    type="checkbox"
                                                    name="marketplaces"
                                                    aria-label="Enter the Marketplace"
                                                    value={country.code}
                                                    ref={register({ required: { value: true, message: Constants.SELECT_MARKETPLACE } })}
                                                    className="mx-2"
                                                />{country.name}
                                            </React.Fragment>
                                        )}
                                    </div>
                                    {errors.marketplaces && <span className="text-red-400 text-md">{errors?.marketplaces?.message}</span>}
                                    <div className="mt-4">
                                        <label htmlFor="fileInput" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center cursor-pointer">
                                            <FaCamera size={18} className="mr-2" />
                                            <span>Upload Logo</span>
                                            <input type="file" id="fileInput" accept=".jpg, .png, .gif, .bmp" aria-label="File Input"
                                                className="hidden" ref={fileInput} onChange={handleUploadLogo} onClick={handleSelectFile} />
                                        </label>
                                        <div className="flex justify-start items-center">
                                            <div className="text-gray-600 text-xs mt-2">(File formats: .png, .jpg, .gif, .bmp)</div>
                                            <div className="text-xs mt-2 ml-2">
                                                {errorFile && <div className="text-red-400">{errorFile}</div>}
                                                {selectedFile && <div className="text-gray-600 font-bold">File: {selectedFile.name}</div>}
                                            </div>
                                        </div>
                                        {progress && <ProgressBar progress={progress} />}
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-4 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="py-2 px-1 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500 mx-4">
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        value="Submit"
                                        className="hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full py-4 px-8 shadow opacity-75 text-white gradient transition ease-in-out duration-700">
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
            <Toast toastProps={toast} />
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
