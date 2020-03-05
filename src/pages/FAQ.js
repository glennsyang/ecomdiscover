import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import Accordion from "../components/accordion"

export default ({ data }) => {

    const props = { title: "Frequently Asked Questions", subtitle: "You've got questions. We've got answers." }

    return (
        <Layout>
            <SEO
                title="FAQ"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-8 pb-10">

                    <div className="accordion w-full flex flex-col mt-10">
                        {data.allMarkdownRemark.edges.map(({ node }) => (
                            <Accordion key={node.frontmatter.id} question={node} />
                        ))}
                    </div>

                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
  query {
    allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          id
          header
        }
        html
      }
    }
  }
  }
`