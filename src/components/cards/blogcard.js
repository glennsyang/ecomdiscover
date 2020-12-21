import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import ImageFluid from "../image-fluid"
import Tag from "../../components/tag"

const BlogCard = ({ post }) => {
    const featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid
    const imgBlankProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `${post.frontmatter.title} Profile Photo`,
        imgClass: "h-8 w-8 rounded-full overflow-hidden"
    }

    return (
        <div className="max-w-xs lg:max-w-sm flex-grow rounded-lg overflow-hidden shadow-xl bg-white m-4 lg:mx-4
        transform hover:-translate-y-1 hover:scale-105 transition ease-in-out duration-300">
            <Link to={`/${post.fields.slug}`}>
                <Img fluid={featuredImgFluid} className="h-48 w-full object-contain" />
                <div className="text-black p-4 mt-2">
                    {/* Tags */}
                    <div className="flex mb-2">
                        <Tag tags={post.frontmatter.tags} />
                    </div>
                    <Link to={`/${post.fields.slug}`} className="hover:text-blue-500">
                        <h1 className="text-xl font-semibold">
                            {post.frontmatter.title}
                        </h1>
                    </Link>
                    <h2 className="text-base font-light mt-2">
                        {post.frontmatter.subtitle}
                    </h2>
                    <div className="flex flex-row justify-between items-center mt-6">
                        <div className="flex flex-row items-center">
                            <ImageFluid props={imgBlankProfile} />
                            <h3 className="text-xs text-gray-500 ml-2">
                                By {post.frontmatter.author}
                            </h3>
                        </div>
                        <p className="text-xs text-gray-500">
                            {post.frontmatter.date}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BlogCard