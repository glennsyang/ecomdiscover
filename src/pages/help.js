import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"

export default () => {

    const props = { title: "Help", subtitle: "" }

    return (
        <Layout>
            <SEO
                title="Help"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-8 pb-10">

                </div>
            </section>
        </Layout>
    )
}
