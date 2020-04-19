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
                            <div className="grid grid-cols-3 gap-1">
                                {allCategories.nodes.map((node) => (
                                    <div key={node.id} className="col-span-1 text-blue-500 text-left p-1 sm:mx-6">
                                        <Link
                                            to={`/companies`}
                                            state={{ category: node.name }}
                                            className="hover:underline">
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
