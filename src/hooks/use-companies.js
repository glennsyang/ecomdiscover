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
            }
        }
    }
    `)

    return data
}
