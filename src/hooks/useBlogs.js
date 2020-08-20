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
    `)

    return data
}
