import React, { useState, useEffect, useRef } from "react"
import Select from "react-select"
import ReactQuill from 'react-quill'
//const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import { FaCamera } from 'react-icons/fa'
import { useCategories } from '../../../hooks/useCategories'
import { useMarketplaces } from '../../../hooks/useMarketplaces'
import Toast from '../../../components/toast'
import * as Constants from '../../../constants'

export default function EditCompany({ register, setValue, errors, rowProps }) {
    const { allMarketplaces } = useMarketplaces()
    const { allCategories } = useCategories()
    const [selectedMarketplaces, setSelectedMarketplaces] = useState([])
    const [toast, setToast] = useState()

    const defaultCategories = allCategories.nodes.map((node) => (
        { value: node.id, label: node.name }
    ))
    const selectedCategories = rowProps.categories.map(category => (
        { value: category.id, label: category.name }
    ))
    //const selectedMarketplaces = allMarketplaces.nodes.map((node) => (
    //    { id: node.id, code: node.code, flag: node.flag, name: node.name, checked: rowProps.marketplaces.some(x => x.id === node.code) }
    //))

    // Categories Selector
    const handleMultiChange = selectedOption => {
        setValue('categories', selectedOption)
    }
    // React-quill Editor
    const [content, setContent] = useState(rowProps.content)
    const handleChangeContent = newValue => {
        setValue('content', newValue)
        setContent(newValue)
    }
    // File Upload
    const fileInput = useRef()
    const [selectedFile, setSelectedFile] = useState(null)
    const [error, setError] = useState(null)
    const handleSelectFile = (e) => {
        e.target.value = null
    }
    const handleUploadLogo = (e) => {
        e.preventDefault()
        const selected = fileInput.current.files[0]
        if (selected && Constants.IMAGE_FILE_TYPES.includes(selected.type)) {
            setSelectedFile(selected)
            setError('')
            rowProps.selectedFile = selected
        } else {
            setSelectedFile(null)
            setError('*Please select an image file (png or jpeg)')
            const toastProperties = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Error',
                description: `File ${selected.name} is not valid. Please select an image file (png or jpeg)`,
                color: 'red',
                position: 'top-right'
            }
            setToast(toastProperties)
            return
        }
    }

    useEffect(() => {
        register({ name: "categories" }, { required: { value: true, message: Constants.FIELD_REQUIRED } })
        register({ name: "content" }, { required: { value: true, message: Constants.FIELD_REQUIRED } })

        async function fetchData() {
            setSelectedMarketplaces(allMarketplaces.nodes.map((node) => (
                { id: node.id, code: node.code, flag: node.flag, name: node.name, checked: rowProps.marketplaces.some(x => x.id === node.code) }
            )))
            const categoriesValue = rowProps.categories.map(category => (
                { value: category.id, label: category.name }
            ))
            setValue('categories', categoriesValue, true)
            setValue('content', rowProps.content)
        }
        fetchData()

        return () => {
            setSelectedFile(null)
            setError(null)
            setContent('')
            setToast()
        }
    }, [register, rowProps, allMarketplaces, setValue])

    return (
        <>
            {/*body*/}
            <div className="relative py-2 px-3 flex-1">
                <div className="block text-left text-black lg:text-lg text-base font-bold">Name</div>
                <input
                    type="text"
                    name="name"
                    defaultValue={rowProps.name}
                    placeholder="Company, Tool or Service Name"
                    aria-label="Enter the Company, Tool or Service Name"
                    ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                    className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                />
                {errors.name && <span className="text-red-400 text-md">{errors?.name?.message}</span>}

                <div className="block text-left text-black lg:text-lg text-base font-bold mt-2">Blurb</div>
                <input
                    type="text"
                    name="blurb"
                    defaultValue={rowProps.blurb}
                    placeholder="A little blurb about the Company, Tool or Service"
                    aria-label="Enter the blurb about Company, Tool or Service Name"
                    ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                    className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                />
                {errors.blurb && <span className="text-red-400 text-md bg-red-100">Errors: {errors?.blurb?.message}</span>}

                <div className="block text-left text-black lg:text-lg text-base font-bold mt-2">Description</div>
                <ReactQuill
                    name="content"
                    placeholder="A longer description about the Company, Tool or Service..."
                    value={content}
                    onChange={handleChangeContent}
                    modules={Constants.editorModules}
                    formats={Constants.editorFormats}
                    theme="snow"
                />
                {errors.content && <span className="text-red-400 text-md bg-red-100">Errors: {errors?.content?.message}</span>}

                <div className="block text-left text-black lg:text-lg text-base font-bold mt-2">Website</div>
                <input
                    type="text"
                    name="website"
                    defaultValue={rowProps.website}
                    placeholder="https://ww.example.com"
                    aria-label="Enter the Website"
                    ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                    className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                />
                {errors.website && <span className="text-red-400 text-md">{errors?.website?.message}</span>}

                <div className="block text-left text-black lg:text-lg text-base font-bold mt-2">Categories</div>
                <Select
                    name="categories"
                    placeholder="Select Categories..."
                    styles={Constants.customStyles}
                    options={defaultCategories}
                    //defaultValue={categoriesValue}
                    //value={categoriesValue}
                    defaultValue={selectedCategories}
                    onChange={handleMultiChange}
                    isMulti
                />
                {errors.categories && <span className="text-red-400 text-md">{errors?.categories?.message}</span>}
                <div className="block text-left text-black lg:text-lg text-base font-bold mt-2">Marketplaces</div>
                <div className="flex-row justify-start text-black">
                    {selectedMarketplaces.map((country) =>
                        <React.Fragment key={country.id}>
                            <input
                                type="checkbox"
                                name="marketplaces"
                                defaultChecked={country.checked}
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
                        <input type="file" id="fileInput" aria-label="File Input"
                            className="hidden" ref={fileInput} onChange={handleUploadLogo} onClick={handleSelectFile} />
                    </label>
                    <div className="flex justify-start items-center">
                        <div className="text-gray-600 text-xs mt-2">(File formats: .png, .jpg, .gif, .bmp)</div>
                        <div className="text-xs mt-2 ml-2">
                            {error && <div className="text-red-400">{error}</div>}
                            {selectedFile && <div className="text-gray-600 font-bold">New File: {selectedFile.name}</div>}
                        </div>
                    </div>
                    {rowProps.logoURL && <img src={rowProps.logoURL} alt={`${rowProps.name} Logo`} className="mt-1 h-12 w-full object-contain" />}
                </div>
            </div>
            <Toast toastProps={toast} />
        </>
    )
}
