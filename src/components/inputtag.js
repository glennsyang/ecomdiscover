import React, { useState } from 'react'

function InputTag({ options }) {
    const [tags, setTags] = useState([])

    const inputKeyDown = (e) => {
        const val = e.target.value
        if (e.key === 'Enter' && val) {
            // Check if tag already exists
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setTags([...tags, val])
            e.target.value = null
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
    }
    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    }

    return (
        <div className="flex flex-wrap bg-white box-border rounded-md border border-gray-400 shadow-inner px-2 py-2">
            <ul className="inline-block flex-wrap m-0 p-0 w-full">
                {tags.map((tag, i) => (
                    <li key={i} className="inline-flex items-center px-3 py-1 mb-1 mr-1 text-gray-600 text-sm font-semibold bg-gray-200 rounded-full list-none">
                        #{tag}
                        <button
                            type="button"
                            onClick={() => { removeTag(i) }}
                            className="inline-flex justify-center items-center appearance-none bg-blue-500 text-white border-none cursor-pointer rounded-full w-5 h-5 focus:outline-none origin-center transform rotate-45 ml-2"
                        >+</button>
                    </li>
                ))}

                <li>
                    <input
                        type="text"
                        onKeyDown={inputKeyDown}
                        placeholder="Enter tags by pressing Enter"
                        className="inline-flex p-0 w-full text-black outline-none"
                    />
                </li>
            </ul>
        </div>
    )
}

export default InputTag