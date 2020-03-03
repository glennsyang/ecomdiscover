import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
//import Card from "../components/card"

import logo_sellics from "../images/logo_sellics.png";
import logo_ads from "../images/ads_digital_ocean.png";

const Review = ({ review }) => {
    return (
        <Layout>
            <SEO
                title="Review"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="pt-4 flex flex-col flex-grow overflow-hidden bg-white">
                <div className="flex bg-gray-100 min-h-40 mb-8 py-6  border-b border-gray-200">
                    <div className="container mx-auto px-6 flex items-center">
                        <div className="flex sm:w-2/3">
                            <Link title="Doug Short reviews" to={`/u/dtshort`} className="rounded-full h-20 w-20 mr-4 flex-shrink-0 overflow-hidden relative">
                                <img src="https://avatars0.githubusercontent.com/u/35756596?v=4" alt="jwana99" className="absolute inset-0 w-full h-full" />
                            </Link>
                            <div className="flex flex-col leading-tight">
                                <h1 className="text-2xl font-bold text-black">
                                    review-title
                            </h1>
                                <span className="text-md text-gray-600">
                                    <Link to={`/`} className="text-gray-600">By Doug Short</Link>
                                    <small className="text-gray-500"> • {new Date().toDateString()}</small>
                                </span>
                                {/* Categories */}
                                <p className="text-gray-500 text-sm mt-2">Categories: Order Management, Repricing, Amazon PPC</p>
                            </div>
                        </div>
                        <div className="sm:w-1/3 ml-2">
                            <a href="https://www.digitalocean.com"><img src={logo_ads} alt="Digital Ocean Ad" /></a>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 pb-12">
                    <div className="flex flex-col lg:flex-row mb-10">
                        <div className="lg:w-3/4">

                            <a href="https://www.sellics.com">
                                <img className="bg-white" src={logo_sellics} alt="Shopkeeper Logo" />
                            </a>

                            <h3 className="text-2xl sm:text-2xl font-semibold text-black mt-4">Review</h3>
                            <p className="sm:text-xl font-light text-black mt-2 mb-6">
                                Has a Profit Dashboard, where you can choose a time period, and it will show you your Revenue and Profit. It takes into account PPC spend, promos, shipping, cost of goods, Amazon fees.
                        </p>
                            <p className="sm:text-xl font-light text-black mb-6">
                                Data gets updated every five minutes.
                        </p>
                            <p className="sm:text-xl font-light text-black mb-6">
                                It has all the numbers you need, to have a good overview of how your Amazon Business is doing. I just didn't like the presentation style too much, looks almost like a spreadsheet. And there are so many features there for Arbitrage, which are irrelevant to me.
                        </p>

                        </div>

                        <div className="mt-12 lg:mt-0 lg:w-1/4 lg:pl-12 sm:flex justify-between lg:block">
                            <div className="mb-12">
                                {/* Star Ratings */}
                                <div className="text-xl font-bold text-black mb-2">Rating</div>
                                <div className="flex flex-col">
                                    <div className="flex mt-2">
                                        <div className="flex text-3xl flex-1 notouch">
                                            <svg className="w-8 h-8 fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                            <svg className="w-8 h-8 fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                            <svg className="w-8 h-8 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                            <svg className="w-8 h-8 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                            <svg className="w-8 h-8 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                        </div>
                                        <div className="flex text-3xl -mt-2 font-bold text-black items-center">
                                            <span>4</span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-600 text-right block mt-2">from 3 ratings</span>
                                </div>
                            </div>
                            <div className="mb-12">
                                {/* Tags */}
                                <div>
                                    <span className="inline-block bg-gray-200 rounded-full mt-2 px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#management</span>
                                    <span className="inline-block bg-gray-200 rounded-full mt-2 px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#repricing</span>
                                    <span className="inline-block bg-gray-200 rounded-full mt-2 px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#amazon</span>
                                    <span className="inline-block bg-gray-200 rounded-full mt-2 px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#photo</span>
                                    <span className="inline-block bg-gray-200 rounded-full mt-2 px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#keyword</span>
                                    <span className="inline-block bg-gray-200 rounded-full mt-2 px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#walmart</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-black mb-2">Related reviews</h3>

                    <div className="grid grid--250 grid-gap-15 w-full">

                    </div>
                </div>

            </section>
        </Layout >
    )
}

export default Review