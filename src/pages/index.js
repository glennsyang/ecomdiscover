import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"

function IndexPage({ data }) {
  return (
    <Layout>

      <SEO
        title="Home"
        keywords={[`amazon`, `seller`, `tools`, `FBA`]}
      />

      {/* Hero */}
      <section className="hero-image flex items-center py-8 sm:py-32" id="hero">

        <div className="flex flex-col w-full max-w-3xl xl:mwx-w-5xl m-auto px-8">

          <h1 className="text-center text-3xl sm:text-4xl font-semibold text-white">
            FIND TOP-RATED TOOLS & SERVICES FOR YOUR E-COMMERCE BUSINESS
          </h1>
          <h4 className="text-center sm:text-xl font-light text-white mb-6">
            Search our curated collection of e-commerce resources
          </h4>

          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-1 relative p-3 bg-white my-1 sm:my-0">
              <div className="text-gray-600 mx-3 text-2xl rounded inline-flex items-center">
                <svg className="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="gray" d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
								c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
								c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461 s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z" /></svg>
              </div>
              <div className="flex flex-1">
                <input placeholder="I'm looking for..." className="w-full text-black outline-none" />
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded-none px-6 py-2 my-1 sm:my-0 overflow-hidden"
              type="submit">
                <span className="text-white">GO</span>
            </button>
          </div>

          <div className="text-white text-center pt-6 inline-block">
            {data.allCategories.edges.map(({ node }) => (
              <Link
                to={`/reviews`}
                key={node.id}
                state={{ category: node.name }}
                className="mr-5 pb-4 inline-block hover:underline">
                  {node.name}
              </Link>
            ))}
          </div>
          <div className="text-white text-center inline-block">
            <Link to={`/categories`} className="inline-block mt-2 font-semibold hover:underline">
              SEE ALL CATEGORIES
            </Link>
          </div>

        </div>
      </section>
      
      {/* Title cards */}
      <section className="bg-gray-100 py-8" id="title-cards">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">

          <h3 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">
            E-Commerce Tools & Services
          </h3>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          
          {
            data.allReviews.edges.map(({ node }) => (
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
      <section className="container mx-auto text-center py-6 mb-12" id="call-to-action">

        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">Write a Review</h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
        </div>

        <h3 className="my-4 text-3xl leading-tight">Review your favorite tools and share your experiences with our community</h3>

        <form action="data">
          <button type="submit"
            className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">Share</button>
        </form>

      </section>
    </Layout >
  )
}

export const query = graphql`
query {
    allReviews(limit: 3, sort: { fields: date, order: ASC }) {
      totalCount
        edges {
            node {
                company
                content
                date(formatString: "DD MMMM, YYYY")
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
    allCategories(limit: 5) {
    edges {
      node {
        id
        name
      }
    }
  }
}
`
export default IndexPage