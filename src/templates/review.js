import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import logo_sellics from "../images/logo_sellics.png";
import logo_ads from "../images/ads_digital_ocean.png";

export default function Review({ data }) {
    const review = data.reviews

    let starRating = [];
    for (let i = 0; i < review.rating; i++) {
        starRating.push(<svg key={i} className="w-4 h-4 fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>);
    }
    for (let i = review.rating; i < 5; i++) {
        starRating.push(<svg key={i} className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>);
    }

    return (
        <Layout>
            <SEO
                title="Review"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="pt-4 flex flex-col flex-grow overflow-hidden bg-white">
                <div className="flex bg-gray-100 min-h-40 mb-8 py-6 border-b border-gray-200">
                    <div className="container mx-auto px-6 flex items-center">
                        <div className="flex sm:w-2/3">
                            <Link title={`${review.username} reviews`} to={`/`} className="rounded-full h-20 w-20 mr-4 flex-shrink-0 overflow-hidden relative">
                                <img src="https://avatars0.githubusercontent.com/u/35756596?v=4" alt="jwana99" className="absolute inset-0 w-full h-full" />
                            </Link>
                            <div className="flex flex-col leading-tight">
                                <h1 className="text-2xl font-bold text-black">
                                    {review.title}
                                </h1>
                                <span className="text-md text-gray-600">
                                    <Link to={`/`} className="text-gray-600">By {review.username}</Link>
                                    <small className="text-gray-500"> • {review.date}</small>
                                </span>
                                {/* Categories */}
                                <p className="text-gray-500 text-sm mt-2">Categories: {review.categories.join(', ')}</p>
                            </div>
                        </div>
                        <div className="sm:w-1/3 ml-2">
                            <a href="https://www.digitalocean.com" rel="noopener noreferrer" target="_blank">
                                <img src={logo_ads} alt="Digital Ocean Ad" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 pb-12">
                    <div className="flex flex-col lg:flex-row mb-10">
                        <div className="lg:w-3/4">

                            <a href={`${review.website}`} rel="noopener noreferrer" target="_blank">
                                <img className="bg-white" src={logo_sellics} alt="Shopkeeper Logo" />
                            </a>

                            <h3 className="text-2xl sm:text-2xl font-semibold text-black mt-4">Review</h3>
                            <p className="sm:text-xl font-light text-black mt-2 mb-6">
                                {review.content}
                            </p>

                        </div>

                        <div className="mt-12 lg:mt-0 lg:w-1/4 lg:pl-12 sm:flex justify-between lg:block">
                            <div className="mb-8">
                                {/* Star Ratings */}
                                <div className="text-xl font-bold text-black mb-2">Rating</div>
                                <div className="flex flex-col">
                                    <div className="flex mt-2">
                                        <div className="flex text-3xl flex-1 notouch">
                                            {starRating}
                                        </div>
                                        <div className="flex text-3xl -mt-2 font-bold text-black items-center">
                                            <span>{review.rating}</span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-600 text-right block mt-2">from {review.rating} ratings</span>
                                </div>
                            </div>
                            <div className="mb-8">
                                {/* Tags */}
                                <div>
                                    {review.tags.map((tag, i) =>
                                        <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mt-2 mr-2">#{tag}</span>
                                    )}
                                </div>
                            </div>
                            <div className="mb-6">
                                {/* Marketplace */}
                                <div className="text-xl font-bold text-black mb-2">Marketplace</div>
                                <div>
                                    <span className="text-gray-500 text-md mt-2">{review.marketplace.join(', ')}</span>
                                </div>
                            </div>
                            <div className="mb-6">
                                {/* Marketplace */}
                                <div className="text-xl font-bold text-black mb-2">Website</div>
                                <div>
                                    {/* Website */}
                                    <a href={`${review.website}`} rel="noopener noreferrer" target="_blank">
                                        <span className="text-gray-500 underline text-md mt-2">{review.website}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 flex flex-col flex-grow overflow-hidden bg-white">
                <div className="flex bg-gray-100 min-h-40 py-6 border-t border-gray-200">
                    <div className="container mx-auto px-6 flex items-center">

                        <h3 className="text-xl font-bold text-black mb-12">Related reviews</h3>
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export const query = graphql`
  query($slug: String!) {
    reviews(fields: { slug: { eq: $slug } }) {
        categories
        company
        content
        date(formatString: "DD MMMM, YYYY")
        id
        marketplace
        rating
        tags
        title
        username
        website
    }
  }
`