import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import { useCategories } from "../hooks/useCategories"
import BlogCard from '../components/cards/blogcard'

function Blog({ data }) {
  const props = { title: "EcomDiscover Blog", subtitle: "We've got a lot to say about ecommerce tools & services." }
  const { allCategories } = useCategories()

  return (
    <Layout>
      <SEO
        title="Blog"
        keywords={[`${allCategories.nodes.map(category => { return category.name })}`]}
        description={`${props.title}: ${props.subtitle}`}
      />
      <section className="bg-gray-100">

        <PageHeader props={props} />

        <div className="container mx-auto px-10 pb-10">

          <div className="w-full justify-center flex flex-wrap">
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <BlogCard key={node.id} blog={node} />
            ))}
          </div>

        </div>
      </section>
    </Layout>
  )
}

export const blogQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            date
            category
            author
            tags
            image
          }
          html
          htmlAst
          excerpt
        }
      }
    }
  }
`

export default Blog