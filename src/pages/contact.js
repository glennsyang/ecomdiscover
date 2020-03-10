import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/page-header"

export default ({ data }) => {

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
                    <p className="text-black text-md mt-2">
                        {data.site.siteMetadata.address}
                    </p>

                    <h3 className="text-black text-lg sm:text-xl font-semibold mb-2 mt-8">
                        For general inquiries, please contact us at:
                    </h3>
                    <h4 className="text-black text-md underline mt-3">
                        Email
                    </h4>
                    <p className="text-black text-md mt-2">
                        <a href="mailto:info@esellertools.com" className="text-blue-500 hover:underline" rel="noopener noreferrer" target="_blank">
                            {data.site.siteMetadata.email}
                        </a>
                    </p>
                    <h4 className="text-black text-md underline mt-4">
                        Phone
                    </h4>
                    <p className="text-black text-md mt-2">
                        <a href="tel:604-555-1234" className="text-blue-500 hover:underline" rel="noopener noreferrer" target="_blank">
                            {data.site.siteMetadata.phone}
                        </a>
                    </p>

                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
query {
    site {
    siteMetadata {
      title
      website
      email
      phone
      address
    }
  }
}
`