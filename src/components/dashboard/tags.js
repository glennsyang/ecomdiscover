import React from 'react'

export default function Tags({ values }) {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (<>
        {values.map((tag, idx) => {
            return (<span key={idx} className="inline-block bg-gray-200 rounded-full px-2 text-xs font-semibold text-gray-700 mr-1">{tag}</span>)
        })}
    </>)
}
