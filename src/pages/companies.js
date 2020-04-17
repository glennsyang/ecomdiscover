import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import CompanyCard from "../components/cards/companycard"
import { useCompanies } from "../hooks/use-companies"

export default () => {
    const props = { title: "Find Top-Rated Tools By Company", subtitle: "" }
    const { allCompanies } = useCompanies()

    return (
        <Layout>
            <SEO
                title="Companies"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">
                <PageHeader props={props} />
                <div className="container mx-auto flex flex-col lg:flex-row pt-2 pb-12">
                    {allCompanies.nodes.map(node => (
                        <CompanyCard key={node.id} company={node} />
                    ))}
                </div>
            </section>
        </Layout >
    )
}
