import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/page-header"
import Tag from "../components/tag"

export default ({ data }) => {

  const props = { title: "Blog", subtitle: "We've got a lot to say about ecommerce tools & services." }

  return (
    <Layout>
      <SEO
        title="Blog"
        keywords={[`amazon`, `seller`, `tools`, `FBA`]}
      />
      <section className="bg-gray-100">

        <PageHeader props={props} />

        <div className="container mx-auto px-10 pb-10">

          <h3 className="text-black text-2xl sm:text-2xl font-semibold mb-6 mt-10">
            Latest Blog Posts
          </h3>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id} className="sm:w-2/3 mt-8">
              <Link to={node.fields.slug}>
                <h3 className="text-black text-xl font-semibold hover:underline">
                  {node.frontmatter.title}
                </h3>
              </Link>
              <p className="text-gray-500 text-xs">
                Categories:
                {node.frontmatter.category.map((category, i) =>
                  <Link to={`/categories`} key={i} className="hover:underline">
                    <span className="ml-1">{category},</span>
                  </Link>
                )}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {node.frontmatter.date}
              </p>
              <p className="text-gray-600 mt-2">
                {node.excerpt}
              </p>
              <div className="mt-2">
                <Tag tags={node.frontmatter.tags} />
              </div>
              <div className="w-full mt-8 mb-4">
                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/posts/"}}, sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
        frontmatter {
          title
          date(formatString: "MMMM Do, YYYY")
          subtitle
          category
          tags
        }
        fileAbsolutePath
        html
        excerpt
        fields {
          slug
        }
      }
    }
  }
}
`