import React, { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import Select from "react-select"
import firebase from "gatsby-plugin-firebase"
import { FaCamera } from 'react-icons/fa'
import * as Constants from '../constants'
import { useCategories } from "../hooks/use-categories"
import { useMarketplaces } from "../hooks/use-marketplaces"
import Toast from "../components/toast"
import Loader from "../components/loader"

export default function CompanyModal(props) {
    const { setValue, register, errors, handleSubmit } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [toast, setToast] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const { allMarketplaces } = useMarketplaces()
    const { allCategories } = useCategories()
    const fileInput = useRef()

    const defaultCategories = allCategories.nodes.map((node) => (
        { value: node.id, label: node.name }
    ))
    const handleMultiChange = selectedOption => {
        setValue('categories', selectedOption)
    }
    const onClose = () => {
        props.onClose && props.onClose()
    }
    // File Upload
    const handleSelectFile = (e) => {
        e.target.value = null
    }
    const handleUploadLogo = (e) => {
        e.preventDefault()
        const fileData = fileInput.current.files[0]
        const fileName = fileInput.current.files[0].name
        const fileType = fileInput.current.files[0].type
        if (Constants.IMAGE_FILE_TYPES.lastIndexOf(fileType) === -1) {
            const toastProperties = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Error',
                description: `File ${fileName} is not a valid image.`,
                color: 'red',
            }
            setToast(toastProperties)
            return
        }
        if (fileData === '' || fileName === '') {
            console.log(`No file selected: ${typeof (fileData)}`)
            return
        }
        setSelectedFile(fileData)
    }
    // Submit button
    const onSubmit = modalData => {
        console.log("modalData:", modalData)
        setIsLoading(true)
        // Upload the logo to the Storage bucket, if exists
        if (selectedFile) {
            const fileData = selectedFile
            const fileName = selectedFile.name
            let reader = new FileReader()
            reader.readAsDataURL(fileData)
            reader.onload = () => {
                const fileContent = reader.result
                const imageRef = firebase.storage().ref().child(`company-images/${fileName}`)
                const uploadTask = imageRef.putString(fileContent, 'data_url')
                // Upload Task
                uploadTask.on('state_changed', (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log(`Upload is '${progress}'% done`)
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused')
                            break
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload is running')
                            break
                        default:
                            break
                    }
                }, (err) => {
                    // Handle Unsuccessful uploads
                    setIsLoading(false)
                    //console.log('File Upload error:', err.code)
                    const toastProperties = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Error',
                        description: `There was an error in uploading the file. Reason: ${err.code}`,
                        color: 'red',
                    }
                    setToast(toastProperties)
                }, () => {
                    // Handle successful uploads on complete
                    // Get URL of new photo
                    uploadTask.snapshot.ref.getDownloadURL().then(companyLogoURL => {
                        createCompanyInFirestore(modalData, companyLogoURL)
                    })
                })
            }
        } else {
            console.log("No Logo uploaded")
            createCompanyInFirestore(modalData, "")
        }
    }
    // Create the Company in the Firestore db
    const createCompanyInFirestore = (modalData, companyLogoURL) => {
        firebase.firestore().collection('companies')
            .add({
                created: firebase.firestore.FieldValue.serverTimestamp(),
                blurb: modalData.blurb,
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
                console.log("Error:", error)
                const toastProperties = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in creating new Company: ${modalData.name}. Reason: ${error}`,
                    color: 'red',
                }
                setToast(toastProperties)
            })
    }

    useEffect(() => {
        register({ name: "categories" }, { required: { value: true, message: Constants.FIELD_REQUIRED } })
    }, [register])


    if (!props.show) { return null }
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                {isLoading
                    ? <Loader />
                    : <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="lg:text-3xl text-xl font-semibold pr-2 md:pr-10">
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
                                <div className="relative p-6 flex-1">
                                    <div className="block text-left text-black lg:text-2xl text-xl font-bold">Name</div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Company, Tool or Service Name"
                                        ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                        className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                    />
                                    {errors.name && <span className="text-red-400 text-md">{errors?.name?.message}</span>}

                                    <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-2">Description</div>
                                    <input
                                        type="text"
                                        name="blurb"
                                        placeholder="A little blurb about the Company, Tool or Service"
                                        ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                        className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                    />
                                    {errors.blurb && <span className="text-red-400 text-md">{errors?.blurb?.message}</span>}

                                    <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-2">Website</div>
                                    <input
                                        type="text"
                                        name="website"
                                        placeholder="Website URL"
                                        ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                        className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                    />
                                    {errors.website && <span className="text-red-400 text-md">{errors?.website?.message}</span>}

                                    <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-2">Categories</div>
                                    <Select
                                        name="categories"
                                        placeholder="Select Categories..."
                                        options={defaultCategories}
                                        styles={Constants.customStyles}
                                        onChange={handleMultiChange}
                                        isMulti
                                    />
                                    {errors.categories && <span className="text-red-400 text-md">{errors?.categories?.message}</span>}
                                    <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-2">Marketplaces</div>
                                    <div className="flex-row justify-start text-black">
                                        {allMarketplaces.nodes.map((country) =>
                                            <React.Fragment key={country.id}>
                                                <input
                                                    type="checkbox"
                                                    name="marketplaces"
                                                    value={country.code}
                                                    ref={register({ required: { value: true, message: Constants.SELECT_MARKETPLACE } })}
                                                    className="mx-2"
                                                />{country.name}
                                            </React.Fragment>
                                        )}
                                    </div>
                                    {errors.marketplaces && <span className="text-red-400 text-md">{errors?.marketplaces?.message}</span>}
                                    <div className="flex mt-4">
                                        <label htmlFor="fileInput" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center cursor-pointer">
                                            <FaCamera size={18} className="mr-2" />
                                            <span>Upload Logo</span>
                                            <input type="file" id="fileInput" className="hidden" ref={fileInput} onChange={handleUploadLogo} onClick={handleSelectFile} />
                                        </label>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="py-2 px-1 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500 mx-4">
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        value="Submit"
                                        className="mx-auto lg:mx-0 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full py-4 px-8 shadow opacity-75 text-white gradient transition ease-in-out duration-700">
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