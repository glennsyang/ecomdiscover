import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import Card from "../components/card"

export default ({ location, data }) => {
    const props = { title: "Reviews", subtitle: "Find top-rated reviews for all your ecommerce tools & services." }
    const reviews = data.allReviews.edges
    let filteredReviews = []

    if (location.state) {
        const { category } = location.state
        filteredReviews = reviews
            .filter((review) =>
                review.node.categories.some((cat) => cat.name === category))
            .map(review => {
                return Object.assign({}, review, { categories: review.node.categories.filter(cat => cat.name === category) })
            })
    }

    return (
        <Layout>
            <SEO
                title="Reviews"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto pb-8">

                    <h3 className="text-black text-2xl sm:text-2xl font-semibold mt-6 mx-6">
                        <span>{filteredReviews.length === 1 ? `${filteredReviews.length} Review` : `${filteredReviews.length} Reviews`}</span>
                        <span className="ml-2">-</span>
                        {location.state && <span className="ml-2">{location.state.category}</span>}
                    </h3>

                    <div className="flex flex-wrap">
                        {filteredReviews.map(({ node }) => (
                            <Card key={node.id} review={node} />
                        ))}
                    </div>

                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
  query {
  allReviews (sort:{ fields: created, order: DESC}) {
    totalCount
    edges {
      node {
        company {
            name
            logo
            website
        }
        content
        created(formatString: "DD MMMM, YYYY")
        id
        fields {
          slug
        }
        marketplace
        rating
        tags
        title
        username
        categories {
          id
          name
        }
      }
    }
  }
}

`