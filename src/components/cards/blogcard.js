import React from "react"
import { Link } from "gatsby"
import ImageFluid from "../image-fluid"

const BlogCard = ({ blog }) => {
    console.log({ blog })
    const props = {
        imgName: blog.frontmatter.image,
        imgAlt: `${blog.frontmatter.title} Logo`,
        imgClass: "h-48 w-full object-contain"
    }
    const profile = {
        imgName: blog.frontmatter.image,
        imgAlt: `${blog.frontmatter.title} Logo`,
        imgClass: "h-8 w-8 rounded-full overflow-hidden"
    }

    return (
        <div className="max-w-xs lg:max-w-sm flex-grow rounded-lg overflow-hidden shadow-xl bg-white m-4 lg:mx-4">
            <Link to={`/${blog.fields.slug}`}>
                <ImageFluid props={props} />
            </Link>
            <div className="text-black p-4 mt-2">
                {/* Category */}
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    {blog.frontmatter.category.join(', ')}
                </div>
                <Link to={`/${blog.fields.slug}`} className="hover:text-blue-500">
                    <h1 className="text-xl font-semibold">
                        {blog.frontmatter.title}
                    </h1>
                </Link>
                <h2 className="text-base font-light mt-2">
                    {blog.frontmatter.subtitle}
                </h2>
                <div className="flex flex-row items-center mt-4">
                    <ImageFluid props={profile} />
                    <h3 className="text-xs text-gray-500 ml-2">
                        By {blog.frontmatter.author}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default BlogCard