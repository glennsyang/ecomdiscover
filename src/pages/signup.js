import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/page-header"

export default () => {

    const props = { title: "SIGN-UP", subtitle: "" }

    return (
        <Layout>
            <SEO
                title="Signup"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-8 pb-10">

                    <h3 className="text-black text-center text-lg sm:text-xl font-semibold mb-2 mt-10">
                        Coming Soon...
                    </h3>

                </div>
            </section>
        </Layout>
    )
}
