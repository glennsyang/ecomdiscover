import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import rehypeReact from 'rehype-react'
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt } from 'react-icons/fa'
import * as Constants from '../constants'
import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageFixed from "../components/image-fixed"
import Category from "../components/category"
import Marketplace from "../components/marketplace"
import AvgRating from "../components/avgrating"
import ReviewCard from "../components/cards/reviewcard"
import Advert from "../components/advert"
import { isLoggedIn, isBlocked } from "../utils/auth"
import { Paragraph, ExternalLink, List } from '../components/rehype/elements'

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { p: Paragraph, a: ExternalLink, ul: List }
}).Compiler

const SortByButton = (props) => {
    const { buttonName, sortType, selected } = props
    const onClick = () => { props.onSort(props) }
    return (
        <button
            className="px-2 cursor-pointer focus:bg-gray-400 focus:text-white focus:outline-none outline-none inline-flex items-baseline"
            onClick={() => onClick()}>
            {selected
                ? sortType === 'down'
                    ? <FaChevronDown size={12} className="mr-1" />
                    : <FaChevronUp size={12} className="mr-1" />
                : ''
            }
            <span>{buttonName}</span>
        </button>
    )
}

export default function Company({ data }) {
    const company = data.companies
    const reviews = data.companies.reviews.filter(review => review.published === true)
    const imgLogo = {
        imgName: company.logo,
        imgAlt: `${company.name} Logo`,
        imgClass: ""
    }
    const [sortButtons, setSortButtons] = useState([
        { id: 1, buttonName: "Helpful", sortType: "down", selected: true },
        { id: 2, buttonName: "Rating", sortType: "down", selected: false },
        { id: 3, buttonName: "Newest", sortType: "down", selected: false },
    ])
    const [currentSort, setCurrentSort] = useState('helpfuldown')
    const [sortHeadingText, setSortHeadingText] = useState("Most Helpful Reviews")
    // method called every time the sort button is clicked
    // it will change the currentSort value to the next one
    const onSortByChange = (props) => {
        const { buttonName, sortType } = props
        let nextSort
        if (sortType === 'down') nextSort = 'up'
        else if (sortType === 'up') nextSort = 'down'
        sortButtons.forEach(sortButton => {
            sortButton.selected = sortButton.buttonName === buttonName ? true : false
            sortButton.sortType = sortButton.buttonName === buttonName ? nextSort : sortButton.sortType
        })
        setSortButtons(sortButtons)
        setCurrentSort(`${buttonName.toLowerCase()}${nextSort}`)
        setSortHeadingText(Constants.SORT_TYPES[`${buttonName.toLowerCase()}${sortType}`].message)
    }
    const [isUserBlocked, setIsUserBlocked] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setIsUserBlocked(await isBlocked())
        }
        fetchData()
    }, [])

    return (
        <Layout>
            <SEO
                title={`Reviews: ${company.name}`}
                keywords={[`${company.name}`].concat(company.categories.map(category => { return category.name }))}
                description={`${company.blurb}${company.content ? ' - ' + company.content.replace(/(.{225})..+/, '$1...') : ''}`}
            />
            <div className="bg-gray-200">

                <div className="container mx-auto">

                    <div id="wrapper" className="flex flex-col lg:flex-row">

                        <main id="main" className="lg:w-3/4 flex flex-col px-4 lg:px-0 pt-6 pb-12 bg-white">

                            {/* Company Heading */}
                            <div id="company-heading" className="flex flex-col lg:flex-row">
                                <div className="lg:w-3/4 flex flex-col lg:ml-10">
                                    {/* Categories */}
                                    <div className="flex">
                                        <Category categories={company.categories} useLink={false} className="inline-block bg-gray-100 border border-gray-200 rounded-md px-2 text-xs font-semibold text-black tracking-tight mr-1" />
                                    </div>
                                    {/* Name */}
                                    <div className="flex mt-1">
                                        <h1 className="text-3xl font-extrabold text-black">{company.name}</h1>
                                    </div>
                                    {/* Blurb */}
                                    <div className="flex mt-1">
                                        <h2 className="text-xl font-normal tracking-tight text-black">{company.blurb}</h2>
                                    </div>
                                    {/* Logo */}
                                    <div id="logo" className="flex pl-4 my-4">
                                        <a href={`${company.website}`} title={company.name} rel="noopener noreferrer" target="_blank">
                                            {company.logo
                                                ? <ImageFixed props={imgLogo} />
                                                : company.logoURL
                                                    ? <img src={company.logoURL} alt={`${company.name} Logo`} className="h-16 w-2/5 object-contain" />
                                                    : <span className="text-gray-400">missing logo</span>
                                            }
                                        </a>
                                    </div>
                                    {/* Description */}
                                    <div className="flex">
                                        <div className="text-base font-sans font-normal tracking-tight leading-normal text-gray-800">
                                            {renderAst(company.childHtmlRehype.htmlAst)}
                                        </div>
                                    </div>
                                    {/* Website & Marketplace */}
                                    <div className="flex items-center mt-4 sm:mt-6">
                                        <a href={company.website} rel="noopener noreferrer" target="_blank"
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded inline-flex flex-shrink-0 items-center -m-1">
                                            <FaExternalLinkAlt size={18} className="mr-3" />
                                            Visit Website
                                        </a>
                                        <div className="flex flex-wrap text-gray-500 text-xs tracking-tight uppercase ml-4">
                                            {company.marketplaces.map(marketplace => {
                                                return <Marketplace key={marketplace.id} marketplace={marketplace} className={"h-4 m-1"} />
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr id="reviews" className="border-b border-gray-400 opacity-25 mt-4 py-0" />

                            {/* Reviews */}
                            <div className="flex flex-col lg:px-10 py-4">
                                <div className="lg:hidden mb-4">
                                    <div className="flex justify-between">
                                        <div className="flex">
                                            <AvgRating arrReviews={company.reviews} rating={null} slug={company.fields.slug} showAvgRating={false} showNumReviews={true} starSize="6" className="text-lg text-blue-500 pl-4" />
                                        </div>
                                        <Link
                                            to={'/app/writereview'}
                                            state={{ companyId: company.id }}
                                            title={'Share!'}
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 sm:px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center sm:mr-6"
                                        >
                                            Share Review
                                    </Link>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="text-2xl sm:text-2xl font-bold text-black">
                                        {sortHeadingText}
                                    </span>
                                    <div className="flex my-2">
                                        <span className="text-sm text-gray-700">
                                            Sort by:
                                        </span>
                                        <span className="ml-2 text-sm text-gray-400 border rounded border-gray-500 inline-block">
                                            {sortButtons.map(sortButton => (
                                                <SortByButton
                                                    key={sortButton.id}
                                                    buttonName={sortButton.buttonName}
                                                    sortType={sortButton.sortType}
                                                    selected={sortButton.selected}
                                                    onSort={onSortByChange}
                                                />
                                            ))}
                                        </span>
                                    </div>
                                </div>
                                {[...reviews].sort(Constants.SORT_TYPES[currentSort].fn).map(review => (
                                    <ReviewCard key={review.id} review={review} company={company} />
                                ))}
                                {isLoggedIn() && isUserBlocked ?
                                    <div className="lg:hidden mt-4 lg:mt-10 text-right mr-8">
                                        <Link
                                            to={'/app/writereview'}
                                            state={{ companyId: company.id }}
                                            title={'Share!'}
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center"
                                        >
                                            Share Review
                                        </Link>
                                    </div> : ''}
                            </div>
                        </main>

                        {/* Ads */}
                        <aside id="sidebar" className="lg:w-1/4 flex flex-col-reverse lg:flex-col lg:py-4 mb-6 lg:pt-20 bg-gray-200 h-full sticky top-0 right-0 overflow-y-scroll lg:pl-4">
                            <Advert />
                            <div className="invisible lg:visible mx-auto lg:mt-10">
                                <div className="flex">
                                    <AvgRating arrReviews={company.reviews} rating={null} slug={company.fields.slug} showAvgRating={false} showNumReviews={true} starSize="6" className="text-lg text-blue-500 pl-4" />
                                </div>
                            </div>
                            {isLoggedIn() && isUserBlocked ?
                                <div className="invisible lg:visible mx-auto mt-2 lg:mt-10">
                                    <Link
                                        to={'/app/writereview'}
                                        state={{ companyId: company.id }}
                                        title={'Share!'}
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center"
                                    >
                                        Share Review
                                    </Link>
                                </div>
                                : ''}
                        </aside>
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
            content
            childHtmlRehype {
                htmlAst
            }
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
                childHtmlRehype {
                    htmlAst
                }
                created
                updated
                published
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
                    role
                    created(formatString: "DD MMMM YYYY")
                }
            }
        }
    }
`