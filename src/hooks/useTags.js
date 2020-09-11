import { useStaticQuery, graphql } from "gatsby"

export const useTags = () => {
    const data = useStaticQuery(graphql`
    query {
        allTags(sort: {fields: tag, order: ASC}) {
            nodes {
                id
                tag
            }
            totalCount
        }
    }
    `)

    return data
}
