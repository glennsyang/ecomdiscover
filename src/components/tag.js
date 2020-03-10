import React from "react"

const Tag = ({ tags }) => {
    console.log("tags:", tags)

    return (
        <div>
            {tags.map(
                (tag, i) => <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mt-1 mr-1">#{tag}</span>
            )}
        </div>
    )
}

export default Tag