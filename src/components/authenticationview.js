import React from "react"
import PropTypes from "prop-types"
import SEO from "../components/seo"

const View = ({ title, children }) => (
    <>
        <SEO
            title={title}
            keywords={[`amazon`, `seller`, `tools`, `FBA`]}
        />
        <div className="container mx-auto bg-white">
            <div className="px-4 py-6 lg:py-0 lg:py-16 md:mx-24 lg:mx-64">
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
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

