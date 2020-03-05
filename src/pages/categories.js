import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
    return (
        <Layout>
            <div className="header-image flex items-center py-8 sm:py-24">
                <div className="flex flex-col w-full max-w-3xl xl:mwx-w-5xl m-auto px-8">
                    <h1 className="text-center text-3xl sm:text-4xl font-semibold uppercase text-white">
                        Find a Top-Rated Tool By Category
                    </h1>
                </div>
            </div>
            <div className="flex justify-center bg-white py-10">
                <div className="grid gap-4 grid-cols-3">
                    {data.allCategories.edges.map(({ node }) => (
                        <div className="flex-1 text-blue-500 text-center bg-gray-400 px-4 py-2 m-2" key={node.id}>
                            {node.name}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
query {
    allCategories {
        edges {
            node {
                id
                name
            }
        }
    }
}
`