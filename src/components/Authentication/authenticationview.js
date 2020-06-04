import React from "react"
import PropTypes from "prop-types"
import SEO from "../seo"

const View = ({ title, children }) => (
    <>
        <SEO
            title={title}
            keywords={[`amazon`, `seller`, `tools`, `FBA`]}
        />
        <div className="container mx-auto bg-white">
            <div className="p-4 lg:py-16 md:mx-24 lg:mx-48">
                <h1 className="text-3xl font-bold mb-2">
                    {title}
                </h1>
                <div>
                    {children}
                </div>
            </div>
        </div>
    </>
)

View.propTypes = {
    title: PropTypes.string.isRequired,
}

export default View

