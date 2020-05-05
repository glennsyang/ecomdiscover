import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageFixed from "../components/image-fixed"
import ImageFluid from "../components/image-fluid"
import Category from "../components/category"
import AvgRating from "../components/avgrating"
import ReviewCard from "../components/cards/reviewcard"

export default function Company({ data }) {
    const company = data.companies
    const reviews = data.companies.reviews
    const imgLogo = {
        imgName: company.logo,
        imgAlt: `${company.name} Logo`,
        imgClass: ""
    }

    const imgAds = {
        imgName: "ads_digital_ocean.png",
        imgAlt: "Digital Ocean Ad",
        imgClass: "w-64 h-full"
    }

    return (
        <Layout>
            <SEO
                title={`Reviews: ${company.name}`}
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <div className="bg-gray-200">

                <div className="container mx-auto bg-white">

                    <div id="wrapper" className="flex flex-col lg:flex-row">

                        <div id="main" className="lg:w-3/4 flex flex-col px-4 lg:px-0 pt-8 mb-12">

                            {/* Company Heading */}
                            <div className="flex flex-col lg:flex-row lg:flex-grow">
                                <div className="lg:w-3/4 flex flex-col lg:ml-10">
                                    {/* Categories */}
                                    <div className="flex">
                                        <Category categories={company.categories} useLink={false} className="inline-block bg-gray-100 border border-gray-200 rounded-md px-2 text-xs font-semibold text-black tracking-tight mr-1" />
                                    </div>
                                    <div className="flex mt-1">
                                        <h1 className="text-3xl font-extrabold text-black">{company.name}</h1>
                                    </div>
                                    <div className="flex mt-1">
                                        <h4 className="text-xl font-normal tracking-tight text-black">{company.blurb}</h4>
                                    </div>
                                    {/* Logo */}
                                    <div className="flex pl-4 my-6">
                                        <a href={`${company.website}`} title={company.name} rel="noopener noreferrer" target="_blank">
                                            {company.logo
                                                ? <ImageFixed props={imgLogo} />
                                                : <img src={company.logoURL} alt={`${company.name} Logo`} className="h-16 w-2/5 object-contain" />
                                            }
                                        </a>
                                    </div>
                                    {/* Marketplace */}
                                    <div className="flex">
                                        <h6 className="flex text-gray-500 text-xs tracking-tight uppercase">
                                            {company.marketplaces.map(marketplace => {
                                                return <img key={marketplace.id} src={marketplace.flag} alt={marketplace.code} className="h-4 mr-2" />
                                            })}
                                        </h6>
                                        <a href={company.website} rel="noopener noreferrer" target="_blank" className="text-xs text-blue-500 tracking-tight font-extrabold pl-2">{company.name}</a>
                                    </div>
                                </div>
                            </div>

                            <hr id="reviews" className="border-b border-gray-400 opacity-25 mt-4 py-0" />

                            {/* Reviews */}
                            <div className="flex flex-col lg:px-10 py-4">
                                <h3 className="text-2xl sm:text-2xl font-bold text-black mb-3">
                                    Reviews
                                </h3>
                                {reviews.map(review => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        </div>

                        {/* Ads */}
                        <div id="sidebar" className="lg:w-1/4 flex flex-col py-10 lg:pb-0 bg-gray-200 relative">
                            <div className="flex mx-auto">
                                <a href="https://www.digitalocean.com" rel="noopener noreferrer" target="_blank">
                                    <ImageFluid props={imgAds} />
                                </a>
                            </div>
                            <div className="flex mx-auto ml-10 lg:mt-32 fixed">
                                <div className="flex">
                                    <AvgRating arrReviews={company.reviews} rating={null} slug={company.fields.slug} showAvgRating={false} showNumReviews={true} starSize="6" className="text-lg text-blue-500 pl-4" />
                                </div>
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
        companies(fields: { slug: { eq: $slug } }) {
            id
            name
            logo
            logoURL
            website
            blurb
            created
            marketplaces {
                id
                flag
                code
                name
            }
            fields {
                slug
            }
            categories {
                id
                name
            }
            reviews {
                id
                title
                content
                created
                helpful {
                    id
                    username
                }
                rating
                tags
                user {
                    id
                    username
                    photoURL
                    created(formatString: "DD MMMM YYYY")
                }
            }
        }
    }
`