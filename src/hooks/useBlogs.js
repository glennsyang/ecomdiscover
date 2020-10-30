import { useStaticQuery, graphql } from "gatsby"

export const useBlogs = () => {
    const data = useStaticQuery(graphql`
    query {
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
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
    `)

    return data
}
