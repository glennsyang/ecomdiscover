import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
//import Image from "../components/image"
import logo_shopkeeper from "../images/logo_sellics.png";

function IndexPage() {
  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[`amazon`, `seller`, `tools`, `FBA`]}
      />
      <div className="hero-image flex items-center py-8 sm:py-48">

        <div className="flex flex flex-col w-full max-w-3xl xl:mwx-w-5xl m-auto px-8">

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
              <div class="flex flex-1">
                <input placeholder="I'm looking for..." class="w-full text-black outline-none" />
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded-none px-6 py-2 my-1 sm:my-0 overflow-hidden"
              type="submit"
            >
              <span className="text-white">GO</span>
            </button>
          </div>

          <div className="text-white text-center py-6 inline-block">
            <Link to="/"  className="mr-5 pb-4 inline-block hover:underline">Order Management</Link> 
            <Link to="/"  className="mr-5 pb-4 inline-block hover:underline">Repricing</Link> 
            <Link to="/"  className="mr-5 pb-4 inline-block hover:underline">Profit Monitoring</Link> 
            <Link to="/"  className="mr-5 pb-4 inline-block hover:underline">Amazon PPC</Link> 
            <Link to="/"  className="mr-5 pb-4 inline-block hover:underline">Photo Editing</Link> 
          </div>

        </div>

      </div>
      
      {/* Title cards */}
      <section className="bg-gray-100 py-8">

        <div className="container mx-auto flex flex-wrap pt-4 pb-12">

          <h3 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">E-Commerce Tools & Services</h3>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          
          <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <Link to="/" className="flex flex-wrap no-underline hover:no-underline">
              <img class="bg-white mx-6 mt-3" src={logo_shopkeeper} alt="Shopkeeper Logo" />
              <div class="px-6 py-4">
                <div class="text-gray-800 font-bold text-xl mb-2">5 stars!</div>
                <p class="text-gray-700 text-base">
                  You can see how many units of each product you still have left. It also shows you how many days it will last for, and tells you when you need to reorder. Helps you to avoid long term storage fees...
                </p>
                <p className="text-gray-400 text-sm mt-2">Category: Order Management, Repricing, Amazon PPC</p>
                  
              </div>
              <div class="px-6 py-4">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#management</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#repricing</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#amazon</span>
              </div>
              </Link>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-center">
                <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Read More</button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <Link to="/" className="flex flex-wrap no-underline hover:no-underline">
                <p className="w-full text-gray-600 text-xs md:text-sm px-6 pt-2">Repricing</p>
                <div className="w-full font-bold text-xl text-gray-800 px-6">Sellics</div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Has a nice inventory dashboard, where you can see which products you should order asap.
                </p>
                <p className="text-gray-800 text-base px-6 mb-5">
                  All you need to provide is how many days it takes to manufacture this product and ship it to Amazon. Then the app will tell you when is the time to re-order...
                </p>
              </Link>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-center">
                <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Read More</button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <Link to="/" className="flex flex-wrap no-underline hover:no-underline">
                <p className="w-full text-gray-600 text-xs md:text-sm px-6 pt-2">Amazon PPC</p>
                <div className="w-full font-bold text-xl text-gray-800 px-6">SellerActive</div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  They integrate with many non-Amazon marketplaces you may be selling on, like Etsy and Newegg and Walmart, and put all the info combined together.
                </p>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Essentially you will only see how many items you have in stock, and be able to receive low stock alerts. If you're selling only on Amazon...
                </p>
              </Link>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
              <div className="flex items-center justify-center">
                <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Read More</button>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Waves SVG */}
      <svg className="gradient" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
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
      <section className="container mx-auto text-center py-6 mb-12">

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

export default IndexPage