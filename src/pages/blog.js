import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import { useCategories } from "../hooks/useCategories"
import BlogCard from '../components/cards/blogcard'

function Blog({ data }) {
  const title = "EcomDiscover Blog"
  const subtitle = "We've got a lot to say about ecommerce tools & services!"
  const { allCategories } = useCategories()

  return (
    <Layout>
      <SEO
        title="Blog"
        keywords={[`${allCategories.nodes.map(category => { return category.name })}`]}
        description={`${title}: ${subtitle}`}
      />
      <section className="bg-gray-100">
        <PageHeader title={title} subtitle={subtitle} />
        <div className="container mx-auto pt-6 pb-12">
          <div className="w-full flex flex-wrap justify-center xl:justify-start">
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <BlogCard key={node.id} post={node} />
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
            date(formatString: "MMMM DD, YYYY")
            category
            author
            tags
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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
