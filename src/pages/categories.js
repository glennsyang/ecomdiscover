import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import { useCategories } from "../hooks/useCategories"

export default () => {
  const title = "Find Top-Rated Tools By Category"
  const subtitle = ""
  const { allCategories } = useCategories()

  return (
    <Layout>
      <SEO
        title="Categories"
        keywords={[`${allCategories.nodes.map(category => { return category.name })}`]}
        description={`${title}`}
      />
      <section className="bg-gray-100">
        <PageHeader title={title} subtitle={subtitle} />
        <div className="container mx-auto px-10 py-8">
          <div className="csscolumn">
            {allCategories.nodes.map((node) => (
              <div key={node.id} className="transform hover:-translate-y-1 hover:translate-x-1 hover:scale-110 transition ease-in-out duration-200 pb-2">
                <Link
                  to={`/company?category=${node.name}`}
                  className="bg-gray-200 border border-gray-300 rounded-md px-2 text-sm font-semibold text-blue-500 tracking-tight text-left">
                  {node.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout >
  )
}
