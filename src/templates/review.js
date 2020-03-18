import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageFixed from "../components/image-fixed"
import ImageFluid from "../components/image-fluid"
import Tag from "../components/tag"
import Category from "../components/category"

export default function Review({ data }) {
    const review = data.reviews

    const imgProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `${review.username} Profile`,
        imgClass: "h-full w-full object-cover"
    };
    const imgAds = {
        imgName: "ads_digital_ocean.png",
        imgAlt: "Digital Ocean Ad",
        imgClass: ""
    };
    const imgLogo = {
        imgName: review.logo,
        imgAlt: `${review.company} Logo`,
        imgClass: "bg-white"
    };

    let starRating = [];
    for (let i = 0; i < review.rating; i++) {
        starRating.push(<svg key={i} className="w-6 h-6 fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>);
    }
    for (let i = review.rating; i < 5; i++) {
        starRating.push(<svg key={i} className="w-6 h-6 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>);
    }

    return (
        <Layout>
            <SEO
                title="Review"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="pt-4 flex flex-col flex-grow overflow-hidden bg-white">

                <div className="flex bg-gray-100 min-h-40 mb-8 py-6">

                    <div className="container mx-auto px-10 flex items-center">

                        <div className="flex sm:w-2/3">
                            <Link title={`${review.username} reviews`} to={`/`} className="h-20 w-20 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                                <ImageFluid props={imgProfile} />
                            </Link>
                            <div className="flex flex-col leading-tight">
                                <h1 className="text-2xl font-bold text-black">
                                    {review.title}
                                </h1>
                                <h3 className="text-md text-gray-600">
                                    <Link to={`/`} className="text-gray-600">By {review.username}</Link>
                                    <small className="text-gray-500"> • {review.date}</small>
                                </h3>
                                {/* Categories */}
                                <h4 className="text-gray-500 text-sm mt-2">
                                    <Category categories={review.categories} />
                                </h4>
                            </div>
                        </div>
                        <div className="sm:w-1/3 ml-2">
                            <a href="https://www.digitalocean.com" rel="noopener noreferrer" target="_blank">
                                <ImageFixed props={imgAds} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-10 pb-12">
                    <div className="flex flex-col lg:flex-row mb-2">
                        <div className="lg:w-3/4">

                            {/* Logo */}
                            <a href={`${review.website}`} rel="noopener noreferrer" target="_blank">
                                <ImageFixed props={imgLogo} />
                            </a>

                            <h3 className="text-2xl sm:text-2xl font-semibold text-black mt-4">Review</h3>
                            <div className="sm:text-lg font-light text-black mt-2 mb-2" dangerouslySetInnerHTML={{ __html: review.content }} />

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
                                    <span className="text-sm text-gray-600 text-right block mt-2">from 1 rating</span>
                                </div>
                            </div>
                            <div className="mb-8">
                                {/* Tags */}
                                <Tag tags={review.tags} />
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
        company
        content
        date(formatString: "DD MMMM, YYYY")
        id
        logo
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
`