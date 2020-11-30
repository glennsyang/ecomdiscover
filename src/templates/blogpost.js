import React from 'react'
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"
import ImageFluid from "../components/image-fluid"
import Advert from "../components/advert"
import SocialShare from '../components/socialshare'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

export default function BlogPost({ data }) {
    const post = data.markdownRemark
    const featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid
    const { siteUrl } = useSiteMetadata()
    const imgLogo = {
        imgName: post.frontmatter.featuredImage.relativePath,
        imgAlt: `${post.frontmatter.featuredImage} file`,
        imgClass: "rounded w-full h-full"
    }

    return (
        <Layout>
            <SEO
                title={`${post.frontmatter.title}`}
                keywords={[`${post.frontmatter.tags}`]}
                description={`${post.frontmatter.title} - ${post.frontmatter.subtitle}`}
            />
            <div className="bg-gray-200">

                <div className="container mx-auto">

                    <div id="wrapper" className="flex flex-col lg:flex-row">

                        <main id="main" className="lg:w-3/4 flex flex-col pt-6 pb-8 bg-white">
                            <div className="lg:w-auto flex flex-col px-6 sm:px-10">
                                {/* Tags */}
                                <div className="flex mb-2">
                                    <Tag tags={post.frontmatter.tags} />
                                </div>
                                <h1 className="text-xl md:text-5xl font-bold">
                                    {post.frontmatter.title}
                                </h1>
                                <h2 className="text-xs md:text-sm font-light text-gray-500 mt-2 mb-6">
                                    {post.frontmatter.author}, {post.frontmatter.date}
                                </h2>
                                {post.frontmatter.author === "E. Akai" ?
                                    <ImageFluid props={imgLogo} />
                                    :
                                    <Img fluid={featuredImgFluid} className="rounded" />
                                }
                                <div className="flex-row border-l-4 border-blue-500 my-6 ml-2">
                                    <p className="text-2xl font-medium text-gray-900 ml-2">{post.frontmatter.subtitle}</p>
                                </div>
                                <div className="markdown" dangerouslySetInnerHTML={{ __html: post.html }} />
                            </div>

                            <div className="text-black mt-10 px-6 sm:px-10 text-right sm:text-left">
                                <SocialShare title={post.frontmatter.title} shareUrl={`${siteUrl}/${post.fields.slug}`} body={post.excerpt} hashtags={post.frontmatter.tags} type={`article`} />
                            </div>
                        </main>

                        {/* Ads */}
                        <aside id="sidebar" className="lg:w-1/4 flex flex-col-reverse lg:flex-col pt-4 lg:py-4 mb-6 lg:pt-20 bg-gray-200 h-full sticky top-0 right-0 overflow-y-scroll lg:pl-4">
                            <Advert />
                        </aside>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query PostQuery($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            fields {
                slug
            }
            html
            excerpt
            frontmatter {
                title
                subtitle
                date(formatString: "MMMM DD, YYYY")
                category
                author
                tags
                featuredImage {
                    relativePath
                    childImageSharp {
                        fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            htmlAst
        }
    }
`