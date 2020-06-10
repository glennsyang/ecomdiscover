import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import { useCategories } from "../hooks/use-categories"

export default () => {
    const props = { title: "Find Top-Rated Tools By Category", subtitle: "" }
    const { allCategories } = useCategories()

    return (
        <Layout>
            <SEO
                title="Categories"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">
                <PageHeader props={props} />
                <div className="container mx-auto px-8 pb-4">
                    <div className="w-full flex flex-col md:flex-row py-8">
                        <div className="flex-1">
                            <div className="md:grid grid-cols-3 gap-1">
                                {allCategories.nodes.map((node) => (
                                    <div key={node.id} className="md:col-span-1">
                                        <Link
                                            to={`/companies`}
                                            state={{ category: node.name }}
                                            className="bg-gray-200 border border-gray-300 rounded-md px-2 text-sm font-semibold text-blue-500 tracking-tight text-left md:mx-6 mb-1 hover:underline">
                                            {node.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout >
    )
}
