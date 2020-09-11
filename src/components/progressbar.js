import React from 'react'

export const ProgressBar = ({ progress }) => {
    return (
        <div className="h-2 mt-5 bg-blue-500 rounded-lg" style={{ width: progress + '%' }}></div>
    )
}

export default ProgressBar