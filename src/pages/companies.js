import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import CompanyCard from "../components/cards/companycard"
import Category from "../components/category"
import { useCompanies } from "../hooks/use-companies"

export default ({ location }) => {
    const props = { title: "E-Commerce Tools & Services", subtitle: "" }
    const { allCompanies } = useCompanies()
    let filteredCompanies = []

    const { state = {} } = location
    const { category } = state
    const flteredCategory = [{ id: 0, name: category }]

    if (category) {
        filteredCompanies = allCompanies.nodes
            .filter((company) =>
                company.categories.some((cat) => cat.name === category))
        //.map(company => {
        //    return Object.assign({}, company, { categories: company.categories.filter(cat => cat.name === category) })
        //})
    } else {
        filteredCompanies = allCompanies.nodes
    }

    return (
        <Layout>
            <SEO
                title="Companies"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">
                <PageHeader props={props} />
                <div className="container mx-auto pb-12">
                    <div className="flex flex-wrap text-black text-2xl sm:text-2xl font-semibold mt-6 mx-6">
                        {category && <span className="text-xs tracking-tight text-gray-600">Applied Category Filter:</span>}
                        {category && <Category categories={flteredCategory} useLink={false} className="bg-gray-200 border border-gray-300 rounded-md px-2 text-xs font-semibold text-blue-500 tracking-tight ml-2" />}
                    </div>
                    <div className="flex flex-wrap">
                        {filteredCompanies.map(node => (
                            <CompanyCard key={node.id} company={node} />
                        ))}
                    </div>
                </div>
            </section>
        </Layout >
    )
}
