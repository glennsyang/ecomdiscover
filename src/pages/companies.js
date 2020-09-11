import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import CompanyCard from "../components/cards/companycard"
import Category from "../components/category"
import { useCompanies } from "../hooks/useCompanies"

export default ({ location }) => {
    const props = { title: "E-Commerce Tools & Services", subtitle: "" }
    const { state = {} } = location
    const { category } = state
    const filteredCategory = [{ id: 0, name: category }]
    const { allCompanies } = useCompanies()

    const [companies, setCompanies] = useState(allCompanies.nodes)

    useEffect(() => {
        let filteredCompanies = []
        if (category) {
            filteredCompanies = allCompanies.nodes
                .filter((company) =>
                    company.categories.some((cat) => cat.name === category))
            //.map(company => {
            //    return Object.assign({}, company, { categories: company.categories.filter(cat => cat.name === category) })
            //})
        } else { filteredCompanies = allCompanies.nodes }
        setCompanies(filteredCompanies)
    }, [category, allCompanies.nodes])

    return (
        <Layout>
            <SEO
                title="Companies"
                keywords={filteredCategory[0].name === undefined ? companies.map(company => { return company.name }) : [filteredCategory[0].name].concat(companies.map(company => { return company.name }))}
                description={`${props.title}: ${filteredCategory[0].name === undefined ? "" : filteredCategory[0].name + " - "}${companies.map(comp => comp.name).join(', ')}`}
            />
            <section className="bg-gray-100">
                <PageHeader props={props} />
                <div className="container mx-auto pb-12">
                    <div className="flex flex-wrap text-black text-2xl sm:text-2xl font-semibold mt-6 mx-6">
                        {category && <span className="text-xs tracking-tight text-gray-600">Applied Category Filter:</span>}
                        {category && <Category categories={filteredCategory} useLink={false} className="bg-gray-200 border border-gray-300 rounded-md px-2 text-xs font-semibold text-blue-500 tracking-tight ml-2" />}
                    </div>
                    <div className="w-full flex flex-wrap justify-center xl:justify-start">
                        {companies.map(node => (
                            <CompanyCard key={node.id} company={node} />
                        ))}
                    </div>
                </div>
            </section>
        </Layout >
    )
}
