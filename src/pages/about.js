import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"

export default () => {
    const props = { title: "About Us", subtitle: "A collection of ecommerce resources primarily related to FBA, but also touching on many other aspects of ecommerce software and resources." };

    return (
        <Layout>
            <SEO
                title="About"
                keywords={[props.subtitle.split(' ')]}
                description={`${props.title}: ${props.subtitle}`}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-8 pb-10">
                    <h3 className="text-black text-xl font-semibold mb-2 mt-10">
                        Our Story
                    </h3>
                    <p className="text-black text-md">
                        Started in February of 2020, we are ecommerce professionals and developers that saw the need for a better way of organizing the quickly expanding selection of services, web tools, and information that supports ecommerce.  We are new and working hard to create a useful service so your feedback is much appreciated.
                    </p>

                    <p className="text-black text-md mt-6">
                        While the services, tools, and information listed does cover a number of different categories, the common theme is that they are all useful to ecommerce businesses.
                    </p>

                </div>
            </section>
        </Layout>
    )
}