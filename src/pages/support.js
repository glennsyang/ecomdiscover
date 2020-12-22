import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"

export default () => {
  const title = "Support"
  const subtitle = ""

  return (
    <Layout>
      <SEO
        title="Support"
        keywords={[`support`, `aura repricer`, `ecommerce`, `FBA`, `amazon repricer`, `profit monitoring`, `listing optimization`]}
        description={subtitle}
      />
      <section className="bg-gray-100">
        <PageHeader title={title} subtitle={subtitle} />
        <div className="container mx-auto px-8 pb-10">
          <h3 className="text-black text-center text-lg sm:text-xl font-semibold mb-2 mt-10">
            Coming Soon...
          </h3>
        </div>
      </section>
    </Layout>
  )
}
