import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

export default () => {
  const title = "Help"
  const subtitle = "Let's Connect!"
  const { email } = useSiteMetadata()

  return (
    <Layout>
      <SEO
        title="Help"
        keywords={[`help`, `aura repricer`, `ecommerce`, `FBA`, `amazon repricer`, `profit monitoring`, `listing optimization`]}
        description={subtitle}
      />
      <section className="bg-gray-100">
        <PageHeader title={title} subtitle={subtitle} />
        <div className="container mx-auto px-8 pb-10">
          <h3 className="text-black text-xl font-semibold mb-4 mt-10">
            We want to connect!
          </h3>
          <p className="text-black text-md">
            You can suggest a new service or
            <Link to={`/categories`} className="text-blue-500 hover:underline ml-1">
              category
            </Link>
            , or for anything else please <a href={`mailto:${email}`} className="text-blue-500 hover:underline" rel="noopener noreferrer" target="_blank">contact us directly</a>.
          </p>
        </div>
      </section>
    </Layout>
  )
}
