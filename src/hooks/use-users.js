import { useStaticQuery, graphql } from "gatsby"

export const useUsers = () => {
    const data = useStaticQuery(graphql`
    query {
        allUsers(sort: {fields: username, order: ASC}) {
            nodes {
                id
                username
                email
                created
                photoURL
                updated
                helpful {
                    id
                    title
                }
            }
        }
    }
    `)

    return data
}
