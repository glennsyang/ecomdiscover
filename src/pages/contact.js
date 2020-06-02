import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export default () => {
    const props = { title: "Contact Us", subtitle: "We welcome any feedback. Feel free to drop us a line" }
    const { title, email } = useSiteMetadata()

    return (
        <Layout>
            <SEO
                title="Contact Us"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-8 pb-10">

                    <h3 className="text-black text-lg sm:text-xl font-semibold mb-2 mt-10">
                        {title}
                    </h3>

                    <h3 className="text-black text-lg sm:text-xl font-semibold mb-2 mt-8">
                        For general inquiries, please contact us at:
                    </h3>
                    <h4 className="text-black text-md underline mt-3">
                        Email
                    </h4>
                    <p className="text-black text-md mt-2">
                        <a href={`mailto:${email}`} className="text-blue-500 hover:underline" rel="noopener noreferrer" target="_blank">
                            {email}
                        </a>
                    </p>

                </div>
            </section>
        </Layout>
    )
}
