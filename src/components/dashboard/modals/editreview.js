import React, { useState, useEffect } from "react"
import CreatableSelect from 'react-select/creatable'
import * as Constants from '../../../constants'

const components = { DropdownIndicator: null, }
const createCompany = (label) => ({ value: label, label: label })

export default function EditReview({ register, setValue, errors, rowProps }) {
    const [tags, setTags] = useState(rowProps.tags.map(tag => (
        { value: tag, label: tag }
    )))
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
        register({ name: "tags" })
    }, [register])

    return (
        <div className="relative p-6 flex-1">
            <div className="block text-left text-black lg:text-2xl text-xl font-bold">Title</div>
            <input
                type="text"
                name="title"
                placeholder="Summarize your review or highlight an interesting detail..."
                defaultValue={rowProps ? rowProps.title : ''}
                aria-label="Title of Review"
                ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
            />
            {errors.title && <span className="text-red-400 text-md">{errors?.title?.message}</span>}

            <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-2">Content</div>
            <textarea
                type="text"
                name="content"
                placeholder="By sharing your experiences you're helping businesses make better choices. Thank you!"
                defaultValue={rowProps ? rowProps.content : ''}
                aria-label="Content of Review"
                ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400 h-40"
            />
            {errors.content && <span className="text-red-400 text-md">{errors?.content?.message}</span>}

            <div className="block text-left text-black lg:text-2xl text-xl font-bold">Tags</div>
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
        </div>
    )
}
