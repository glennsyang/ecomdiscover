import React, { useState } from 'react'

const InputTag = ({ name, register }) => {
    const isChecked = true
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
        <div className="bg-white border border-gray-400 shadow-inner rounded-md flex flex-wrap p-2">
            <ul className="inline-flex flex-wrap p-0 w-full">
                {tags.map((tag, i) => (
                    <li key={i} className="items-center bg-gray-200 rounded-full text-gray-600 flex font-semibold list-none mr-1 mt-1 px-3 py-1 text-sm">
                        #{tag}
                        <button
                            type="button"
                            onClick={() => { removeTag(i) }}
                            className="items-center appearance-none bg-blue-500 border-none rounded-full text-white text-xs font-bold cursor-pointer inline-flex justify-center origin-center ml-2 transform rotate-45 w-6 h-6 focus:outline-none"
                        >+</button>
                    </li>
                ))}
                <li className="flex-grow">
                    <input
                        type="text"
                        placeholder="Enter tags by pressing Enter"
                        onKeyDown={inputKeyDown}
                        className="text-black w-full flex-grow p-0 outline-none placeholder-gray-400"
                    />
                </li>
                {tags.map((tag, i) =>
                    <React.Fragment key={i}>
                        <input
                            type="checkbox"
                            name={name}
                            value={tag}
                            defaultChecked={isChecked}
                            hidden={isChecked}
                            ref={register}
                            className="text-black w-full flex-grow"
                        />{tag}
                    </React.Fragment>
                )}
            </ul>
        </div>
    )
}

export default InputTag