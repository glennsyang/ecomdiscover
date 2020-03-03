import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
    <Layout>
        <SEO
            title="About"
            keywords={[`amazon`, `seller`, `tools`, `FBA`]}
        />
        <section className="hero-image flex items-center py-8 sm:py-40" id="hero">
            <div className="flex flex-col w-full max-w-3xl xl:mwx-w-5xl m-auto px-8">

                <h1 className="text-center text-3xl sm:text-4xl font-semibold text-white">ABOUT US</h1>
                <h4 className="text-center sm:text-xl font-light text-white mb-6">
                    A collection of ecommerce resources. Primarily related to FBA, but also touching on many other aspects of ecommerce software and resources.
                </h4>

            </div>
        </section>
    </Layout>
)