import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/page-header"

export default ({ data }) => {

    const props = { title: "Find Top-Rated Tools By Category", subtitle: "" };

    return (
        <Layout>
            <SEO
                title="Categories"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-8 pb-4">
                    <div className="w-full flex flex-col md:flex-row py-8">
                        <div className="flex-1">
                            <div className="grid grid-cols-3 gap-1">
                                {data.allCategories.edges.map(({ node }) => (
                                    <div className="col-span-1 text-blue-500 text-left p-1 sm:mx-6" key={node.id}>
                                        <Link
                                            to={`/reviews`}
                                            state={{ category: node.name }}
                                            className="hover:underline">{node.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </Layout >
    )
}

export const query = graphql`
query {
    allCategories (sort: { fields: name, order: ASC }) {
    edges {
      node {
        id
        name
      }
    }
  }
}
`