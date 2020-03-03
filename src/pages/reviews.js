import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
    console.log(data)
    return (
        <Layout>
            <div className="bg-gray-500">
                <h1>All Reviews</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Content</th>
                            <th>Rating</th>
                            <th>Categories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.allReviews.edges.map(({ node }) => (
                            <tr key={node.id}>
                                <td>{node.company}</td>
                                <td>{node.title}</td>
                                <td>{node.date}</td>
                                <td>{node.content}</td>
                                <td>{node.rating}</td>
                                <td>{node.categories}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export const query = graphql`
query {
    allReviews {
        edges {
            node {
                categories
                company
                content
                date
                id
                rating
                tags
                title
                username
                website
            }
        }
    }
}
`