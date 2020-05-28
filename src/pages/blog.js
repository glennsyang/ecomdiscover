import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"

export default () => {
  const props = { title: "Blog", subtitle: "We've got a lot to say about ecommerce tools & services." }

  return (
    <Layout>
      <SEO
        title="Blog"
        keywords={[`amazon`, `seller`, `tools`, `FBA`]}
      />
      <section className="bg-gray-100">

        <PageHeader props={props} />

        <div className="container mx-auto px-10 pb-10">

          <h3 className="text-black text-2xl sm:text-2xl font-semibold mb-6 mt-10">
            Latest Blog Posts
          </h3>

        </div>
      </section>
    </Layout>
  )
}
