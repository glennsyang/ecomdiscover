import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/page-header"

export default ({ location }) => {
    const { state } = location

    const props = { title: "Thank you", subtitle: "We appreciate your review!" }

    return (
        <Layout>
            <SEO
                title="Submitted"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-8 pb-10">

                    <h3 className="text-black text-xl font-semibold mb-4 mt-10">
                        Thank you {state ? state.username : ''} for your submission{state ? ` about: ${state.company}` : ''}!
                    </h3>
                    <p className="text-black text-md">
                        By sharing your experiences you're helping businesses make better choices.
                        Check back soon to see your review posted.
                    </p>

                </div>
            </section>
        </Layout>
    )
}
