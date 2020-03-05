import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"

export default () => {

    const props = { title: "Contact Us", subtitle: "We welcome any feedback. Feel free to drop us a line" };

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
                        E-Seller Tools Offices
                    </h3>
                    <p className="text-black text-md mt-2">123 Main Street</p>
                    <p className="text-black text-md">Sometown, QC</p>

                    <h3 className="text-black text-lg sm:text-xl font-semibold mb-2 mt-8">
                        For general inquiries, please contact us at:
                    </h3>
                    <h4 className="text-black text-md underline mt-3">
                        Email
                    </h4>
                    <p className="text-black text-md mt-2">
                        info@esellertools.com
                    </p>
                    <h4 className="text-black text-md underline mt-4">
                        Phone
                    </h4>
                    <p className="text-black text-md mt-2">
                        604-555-1234
                    </p>


                    <h4 className="text-black text-lg sm:text-xl font-semibold mt-6">
                        Contact Form
                    </h4>
                    <p className="text-black text-md mt-2">...</p>

                </div>
            </section>
        </Layout>
    )
}