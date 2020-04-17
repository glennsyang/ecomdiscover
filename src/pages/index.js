import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchBox from '../components/searchbox'
import Card from "../components/cards/card"
import { isLoggedIn } from "../utils/auth"

function IndexPage({ data }) {
  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[`amazon`, `seller`, `tools`, `FBA`]}
      />

      <div className="gradient">
        {/* Hero */}
        <section className="hero-image flex items-center py-8 sm:py-20" id="hero">

          <div className="flex flex-col w-full max-w-3xl xl:mwx-w-5xl m-auto px-8">

            <h1 className="font-serif text-center text-3xl sm:text-4xl font-semibold text-white">
              Find Top-Rated Tools & Services For Your E-commerce Business
          </h1>
            <h4 className="text-center sm:text-xl font-light text-white mb-6">
              Search our curated collection of e-commerce resources
          </h4>

            {/* Search Box */}
            <SearchBox searchIndex={data.siteSearchIndex.index} />

            <div className="text-white text-center font-semibold pt-6 inline-block">
              {data.allCategories.edges.map(({ node }) => (
                <Link
                  to={`/reviews`}
                  key={node.id}
                  state={{ category: node.name }}
                  className="mr-4 pb-4 inline-block hover:underline">
                  {node.name}
                </Link>
              ))}
            </div>
            <div className="text-white text-center inline-block">
              <Link to={`/categories`} className="block mt-2 font-semibold hover:underline">
                SEE ALL CATEGORIES
              </Link>
              <div className="block mt-2 font-semibold">- OR -</div>
              <Link to={`/companies`} className="block mt-2 font-semibold hover:underline">
                COMPANIES
              </Link>
            </div>

          </div>
        </section>

        {/* Title cards */}
        <section className="bg-gray-100 py-8" id="title-cards">
          <div className="container mx-auto flex flex-wrap pt-2 pb-12">

            <h3 className="antialiased w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">
              E-Commerce Tools & Services
            </h3>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>

            {data.reviews.edges.map(({ node }) => (
              <Card key={node.id} review={node} />
            ))}

          </div>
        </section>

        {/* Waves SVG */}
        <svg className="gradient" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
              <g className="gradient" fill="#f8fafc">
                <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
              </g>
              <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
                <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                  <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                  <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001"></path>
                  <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>

        {/* CTA block */}
        <section className="container mx-auto text-center py-6 pb-16" id="call-to-action">

          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">Write a Review</h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          <h3 className="mt-4 mb-12 text-3xl leading-tight text-center text-white px-2">Review your favorite tools and share your experiences with our community</h3>

          <Link
            to={isLoggedIn() ? '/app/writereview' : '/app/login'}
            state={{ fromShare: true }}
            title={isLoggedIn() ? 'Share!' : 'Please log-in to share a review'}
            className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-8 py-4 px-8 shadow-lg"
          >
            Share
          </Link>

        </section>

      </div>
    </Layout >
  )
}

export const query = graphql`
  query {
    reviews: allReviews(limit: 3, sort: { fields: created, order: ASC }) {
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
                user {
                  id
                  username
                }
                categories {
                  id
                  name
                }
            }
        }
    }
    allCategories(limit: 5) {
    edges {
      node {
        id
        name
      }
    }
  }
  siteSearchIndex {
    index
  }
}
`
export default IndexPage