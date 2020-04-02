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
        imgClass: "w-64"
    };
    const imgLogo = {
        imgName: review.company.logo,
        imgAlt: `${review.company.name} Logo`,
        imgClass: ""
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
            <div className="bg-gray-200">

                <div className="container mx-auto bg-white">

                    {/* Row */}
                    <div className="flex flex-col mt-20">

                        <div className="flex flex-col lg:flex-row">

                            <div className="lg:w-3/4 flex flex-col p-4 mb-12">

                                {/* Company Heading */}
                                <div className="flex flex-col lg:flex-row lg:flex-grow">

                                    <div className="lg:w-3/5 flex ml-4">
                                        {/* Logo */}
                                        <div className="flex items-center">
                                            <a href={`${review.company.website}`} rel="noopener noreferrer" target="_blank">
                                                <ImageFixed props={imgLogo} />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="lg:w-2/5 flex flex-col justify-between lg:block">
                                        {/* Website */}
                                        <h3 className="flex text-xl font-bold text-black mb-2">Website</h3>
                                        {/* Website */}
                                        <a href={`${review.company.website}`} rel="noopener noreferrer" target="_blank">
                                            <span className="text-gray-500 underline text-md mt-2">{review.company.website}</span>
                                        </a>
                                        {/* Marketplace */}
                                        <h3 className="flex text-xl font-bold text-black mb-2 mt-2">Marketplace</h3>
                                        <div>
                                            <span className="text-gray-500 text-md mt-2">{review.marketplace.join(', ')}</span>
                                        </div>
                                    </div>

                                </div>

                                <hr className="border-b border-gray-400 opacity-25 mt-4 py-0" />

                                <div className="flex flex-col lg:px-10 py-6">

                                    <h3 className="text-2xl sm:text-2xl font-bold text-black mb-4">Reviews</h3>

                                    {/* Card */}
                                    <div className="rounded-lg shadow-xl border border-gray-100 bg-white p-10 mt-10">

                                        <div className="flex flex-col lg:flex-row lg:flex-grow">
                                            {/* Avatar */}
                                            <div className="lg:w-32 flex">
                                                <Link title={`${review.username} reviews`} to={`/`} className="h-20 w-20 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                                                    <ImageFluid props={imgProfile} />
                                                </Link>
                                            </div>
                                            {/* User Details & Review Content */}
                                            <div className="lg:w-full flex flex-col">
                                                <h3 className="flex text-base font-bold text-black">
                                                    {review.username}
                                                </h3>
                                                <div className="flex pt-2 mb-4">
                                                    <span className="text-gray-400 text-xs">{review.created}</span>
                                                    <span className="text-gray-400 text-xs">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                                    <span className="text-gray-400 text-xs">Member Since:&nbsp;</span>
                                                    <span className="text-gray-400 text-xs">01/01/20</span>
                                                </div>
                                                <div className="flex flex-1 mb-4">
                                                    {starRating}
                                                </div>
                                                <p className="text-black text-base font-bold mb-4">{review.title}</p>
                                                <div
                                                    className="text-md font-light text-black"
                                                    dangerouslySetInnerHTML={{ __html: review.content }}
                                                />
                                                <div className="mt-8 mr-4">
                                                    <button className="float-right bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                                                        <span>Helpful</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Ads */}
                            <div className="lg:w-1/4 flex p-4 bg-gray-200">
                                <a href="https://www.digitalocean.com" rel="noopener noreferrer" target="_blank">
                                    <ImageFluid props={imgAds} />
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </Layout >
    )
}

export const query = graphql`
  query($slug: String!) {
    reviews(fields: { slug: { eq: $slug } }) {
        company {
            name
            logo
            website
        }
        content
        created(formatString: "DD MMMM, YYYY, h:mm a")
        id
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
`