import { useStaticQuery, graphql } from "gatsby"

export const useMarketplaces = () => {
    const data = useStaticQuery(graphql`
    query {
        allMarketplaces(sort: { fields: code, order: DESC }) {
            nodes {
                id
                code
                flag
                name
            }
        }
    }
    `)

    return data
}
