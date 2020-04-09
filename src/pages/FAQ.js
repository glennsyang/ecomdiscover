import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/page-header"
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
            {data.allFaq.edges.map(({ node }) => (
              <Accordion key={node.id} question={node} />
            ))}
          </div>

        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFaq(sort: {fields: [date], order: ASC}) {
    edges {
      node {
        content
        title
        date
        id
      }
    }
  }
}
`
