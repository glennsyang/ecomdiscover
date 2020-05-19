import React from "react"

const Footer = ({ title }) => {
    return (
        <footer className="bg-gray-800 border-b p-4">
            <div className="flex flex-1 mx-auto text-sm text-gray-500">
                Copyright &copy; {new Date().getFullYear()} {` `} {title} Inc. All rights reserved
            </div>
        </footer>
    )
}

export default Footer