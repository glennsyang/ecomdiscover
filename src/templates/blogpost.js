import React from 'react'
import { graphql } from "gatsby"
import rehypeReact from 'rehype-react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Advert from "../components/advert"
import SocialShare from '../components/socialshare'
import ImageFluid from "../components/image-fluid"
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import { Paragraph, ExternalLink, List } from '../components/rehype/elements'

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { p: Paragraph, a: ExternalLink, ul: List }
}).Compiler

export default function BlogPost({ data }) {
    console.log({ data })
    const blog = data.markdownRemark
    const props = {
        imgName: blog.frontmatter.image,
        imgAlt: `${blog.frontmatter.title} Logo`,
        imgClass: "h-auto w-auto rounded mt-8"
    }
    const { siteUrl } = useSiteMetadata()

    return (
        <Layout>
            <SEO
                title={`${blog.frontmatter.title}`}
                keywords={[`${blog.frontmatter.tags}`]}
                description={`${blog.frontmatter.title} - ${blog.frontmatter.subtitle}`}
            />
            <div className="bg-gray-200">

                <div className="container mx-auto">

                    <div id="wrapper" className="flex flex-col lg:flex-row">

                        <main id="main" className="lg:w-3/4 flex flex-col pt-6 pb-8 bg-white">
                            <div className="lg:w-auto flex flex-col px-6 sm:px-10">
                                {/* Category */}
                                <div className="text-xs text-gray-500 uppercase tracking-wide">
                                    {blog.frontmatter.category.join(', ')}
                                </div>
                                <h1 className="text-xl md:text-5xl font-bold">
                                    {blog.frontmatter.title}
                                </h1>
                                <h2 className="text-xs md:text-sm font-light text-gray-500 mt-2">
                                    {blog.frontmatter.author}, {blog.frontmatter.date}
                                </h2>
                                <ImageFluid props={props} />
                                <div className="flex-row border-l-4 border-blue-500 mt-6 ml-2">
                                    <p className="text-2xl font-medium text-gray-900 ml-2">{blog.frontmatter.subtitle}</p>
                                </div>
                                <div className="text-lg font-light text-gray-800 mt-8">
                                    {renderAst(blog.htmlAst)}
                                </div>
                            </div>

                            <div className="text-black mt-10 px-6 sm:px-10">
                                <SocialShare title={blog.frontmatter.title} shareUrl={`${siteUrl}/${blog.fields.slug}`} body={blog.excerpt} hashtags={blog.frontmatter.tags} type={`article`} />
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
    query($slug: String!) {
        markdownRemark(fields: {slug: {eq: $slug } }) {
            id
            fields {
                slug
            }
            frontmatter {
                title
                subtitle
                date
                category
                author
                tags
                image
            }
            html
            htmlAst
            excerpt
        }
    }
`