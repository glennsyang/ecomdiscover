import { useStaticQuery, graphql } from "gatsby"

export const useCategories = () => {
    const data = useStaticQuery(graphql`
      query {
        allCategories(sort: {fields: name, order: ASC}) {
            nodes {
                id
                name
            }
        }
    }
    `)

    return data
}
