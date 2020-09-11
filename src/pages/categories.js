import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import { useCategories } from "../hooks/useCategories"

export default () => {
    const props = { title: "Find Top-Rated Tools By Category", subtitle: "" }
    const { allCategories } = useCategories()

    return (
        <Layout>
            <SEO
                title="Categories"
                keywords={[`${allCategories.nodes.map(category => { return category.name })}`]}
                description={`${props.title}`}
            />
            <section className="bg-gray-100">
                <PageHeader props={props} />
                <div className="container mx-auto px-8 pb-4">
                    <div className="w-full flex flex-col md:flex-row py-8">
                        <div className="flex-1">
                            <div className="lg:grid grid-cols-3 gap-1">
                                {allCategories.nodes.map((node) => (
                                    <div key={node.id} className="lg:col-span-1 transform hover:-translate-y-1 hover:translate-x-1 hover:scale-110 transition ease-in-out duration-200">
                                        <Link
                                            to={`/companies`}
                                            state={{ category: node.name }}
                                            className="bg-gray-200 border border-gray-300 rounded-md px-2 text-sm font-semibold text-blue-500 tracking-tight text-left lg:mx-6 mb-1">
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
