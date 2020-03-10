import React from "react"

const PageHeader = ({ props }) => {
    return (
        <div className="header-image flex items-center py-8 sm:py-20">
            <div className="flex flex-col w-full max-w-3xl xl:mwx-w-5xl m-auto px-8">
                <h1 className="text-center text-3xl sm:text-4xl font-semibold uppercase text-white">
                    {props.title}
                </h1>
                <h2 className="sm:text-xl font-light text-center text-white">
                    {props.subtitle}
                </h2>
            </div>
        </div>
    )
}

export default PageHeader