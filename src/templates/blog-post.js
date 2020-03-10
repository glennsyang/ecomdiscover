import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import logo_ads from "../images/ads_digital_ocean.png";

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO
        title={`Blog: ${post.frontmatter.title}`}
        keywords={[`amazon`, `seller`, `tools`, `FBA`]}
      />
      <section className="bg-white">

        <div className="flex bg-gray-100 min-h-40 mb-6 py-6 border-b border-gray-200">
          <div className="container mx-auto px-6 flex items-center">
            <div className="flex sm:w-2/3">
              <Link title={`${post.frontmatter.author}`} to={`/`} className="rounded-full h-20 w-20 mr-4 flex-shrink-0 overflow-hidden relative">
                <img src="https://avatars0.githubusercontent.com/u/35756596?v=4" alt={post.frontmatter.author} className="absolute inset-0 w-full h-full" />
              </Link>
              <div className="flex flex-col leading-tight">
                <h1 className="text-2xl font-bold text-black">
                  {post.frontmatter.title}
                </h1>
                <span className="text-md text-gray-600">
                  <Link to={`/`} className="text-gray-600">By {post.frontmatter.author}</Link>
                  <small className="text-gray-500"> • {post.frontmatter.date}</small>
                </span>
                {/* Categories */}
                <p className="text-gray-500 text-sm mt-2">
                  Categories:
                  {post.frontmatter.category.map((category, i) =>
                    <Link to={`/categories`} key={i} className="hover:underline">
                      <span className="ml-1">{category},</span>
                    </Link>
                  )}
                </p>
              </div>
            </div>

            <div className="sm:w-1/3 ml-2 mt-4">
              <a href="https://www.digitalocean.com" rel="noopener noreferrer" target="_blank">
                <img src={logo_ads} alt="Digital Ocean Ad" />
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-10 pb-10">
          <div className="flex flex-col lg:flex-row mb-10">

            <div className="w-3/4">
              <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: post.html }} />

            </div>

            <div className="w-1/4 sm:flex justify-between lg:block ml-8">
              {/* Tags */}
              <div>
                {post.frontmatter.tags.map((tag, i) =>
                  <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 mt-2 mr-2 text-sm font-semibold text-gray-600">
                    #{tag}
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        category
        tags
        author
        date(formatString: "MMM Do, YYYY")
      }
    }
  }
`