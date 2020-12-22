import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"

export default ({ location }) => {
  const { state } = location
  const title = "Thank you"
  const subtitle = "We appreciate your review!"

  return (
    <Layout>
      <SEO
        title="Submitted"
        keywords={[`review`, `aura repricer`, `ecommerce`, `FBA`, `amazon repricer`, `profit monitoring`, `listing optimization`]}
        description={`${subtitle} ${state?.username}`}
      />
      <section className="bg-gray-100">
        <PageHeader title={title} subtitle={subtitle} />
        <div className="container mx-auto px-8 pb-10">
          <h3 className="text-black text-xl font-semibold mb-4 mt-10">
            Thank you {state ? state.username : ''} for your submission!
          </h3>
          <p className="text-black text-md">
            By sharing your experiences you're helping businesses make better choices.
            Check back soon to see your review posted.
          </p>
        </div>
      </section>
    </Layout>
  )
}
