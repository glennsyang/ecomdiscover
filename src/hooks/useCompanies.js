import { useStaticQuery, graphql } from "gatsby"

export const useCompanies = () => {
    const data = useStaticQuery(graphql`
    query {
        allCompanies(sort: { fields: fields___slug, order: ASC }) {
            nodes {
                id
                name
                logo
                logoURL
                website
                blurb
                content
                created
                updated
                marketplaces {
                    id
                    flag
                    code
                    name
                }
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
                    updated
                    published
                    rating
                    tags
                    helpful {
                        username
                        email
                        photoURL
                        created
                        updated
                    }
                    user {
                        username
                        email
                        photoURL
                        role
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
