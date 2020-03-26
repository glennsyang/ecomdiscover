import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/page-header"
import Tag from "../components/tag"
import Category from "../components/category"

export default ({ location, data }) => {

    const props = { title: "REVIEWS", subtitle: "Find top-rated reviews for all your ecommerce tools & services." }

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

    function truncateStr(str, n, useWordBoundary) {
        if (str.length <= n) { return str; }
        var subString = str.substr(0, n - 1);
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + "...";
    }

    return (
        <Layout>
            <SEO
                title="Reviews"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-10 pb-10">

                    <h3 className="text-black text-2xl sm:text-2xl font-semibold mb-6 mt-10">
                        <span>{filteredReviews.length === 1 ? `${filteredReviews.length} Review` : `${filteredReviews.length} Reviews`}</span>
                    </h3>
                    {filteredReviews
                        .map(({ node }) => (
                            <div key={node.id} className="sm:w-2/3 mt-8">
                                <Link to={node.fields.slug}>
                                    <h3 className="text-black text-xl font-semibold hover:underline">
                                        {node.title}
                                    </h3>
                                </Link>
                                <h4 className="text-gray-500 text-xs">
                                    <Category categories={node.categories} />
                                </h4>
                                <h4 className="text-gray-500 text-xs mt-1">
                                    {node.created}
                                </h4>
                                <p className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: truncateStr(node.content, 250, true) }} />

                                <div className="mt-2">
                                    <Tag tags={node.tags} />
                                </div>
                                <div className="w-full mt-8 mb-4">
                                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                                </div>
                            </div>
                        ))}
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
        company
        content
        created(formatString: "DD MMMM, YYYY")
        logo
        id
        fields {
          slug
        }
        marketplace
        rating
        tags
        title
        username
        website
        categories {
          id
          name
        }
      }
    }
  }
}

`