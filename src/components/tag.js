import React from "react"

const Tag = ({ tags }) => {
    return (
        <div>
            {tags.map((tag, i) =>
                <span
                    key={i}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 mb-1 text-xs font-semibold text-gray-700 mr-1"
                >
                    #{tag}
                </span>
            )}
        </div>
    )
}

export default Tag