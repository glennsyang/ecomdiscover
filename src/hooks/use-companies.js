import { useStaticQuery, graphql } from "gatsby"

export const useCompanies = () => {
    const data = useStaticQuery(graphql`
    query {
        allCompanies(sort: { fields: name, order: ASC }) {
            nodes {
                id
                name
                logo
                website
                blurb
                marketplace
                fields {
                    slug
                }
                categories {
                    id
                    name
                }
                reviews {
                    id
                    title
                    content
                    created
                    marketplace
                    rating
                    tags
                    user {
                        username
                        email
                        photoURL
                        created
                        updated
                    }
                }
            }
        }
    }
    `)

    return data
}
