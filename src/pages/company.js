import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import CompanyCard from "../components/cards/companycard"
import Category from "../components/category"
import Loader from "../components/loader"

import { useLocation } from '@reach/router'
import queryString from 'query-string'

const Company = ({ data }) => {
  const title = "E-Commerce Tools & Services"
  const subtitle = ""

  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation()
  const queried = queryString.parse(location.search)
  const { category } = queried
  const filteredCategory = [{ id: 0, name: category }]

  const [companies, setCompanies] = useState(data.allCompanies.nodes)

  useEffect(() => {
    let filteredCompanies = []
    if (category) {
      filteredCompanies = companies
        .filter((company) =>
          company.categories.some((cat) => cat.name === category))
    } else { filteredCompanies = companies }
    setCompanies(filteredCompanies)
    setIsLoading(false)
  }, [category, companies])

  return (
    <Layout>
      <SEO
        title="Companies"
        keywords={filteredCategory[0].name === undefined ? companies.map(company => { return company.name }) : [filteredCategory[0].name].concat(companies.map(company => { return company.name }))}
        description={`${title}: ${filteredCategory[0].name === undefined ? "" : filteredCategory[0].name + " - "}${companies.map(comp => comp.name).join(', ')}`}
      />
      <section className="bg-gray-100">
        <PageHeader title={title} subtitle={subtitle} />
        <div className="container mx-auto pb-12">
          <div className="flex flex-wrap text-black text-2xl sm:text-2xl font-semibold mt-6 mx-6">
            {category && <span className="text-xs tracking-tight text-gray-600">Applied Category Filter:</span>}
            {category && <Category categories={filteredCategory} useLink={false} className="bg-gray-200 border border-gray-300 rounded-md px-2 text-xs font-semibold text-blue-500 tracking-tight ml-2" />}
          </div>
          {isLoading
            ? <Loader />
            : <div className="w-full flex flex-wrap justify-center xl:justify-start">
              {companies.map(node => (
                <CompanyCard key={node.id} company={node} />
              ))}
            </div>}
        </div>
      </section>
    </Layout >
  )
}

export const pageQuery = graphql`
  query CompaniesQuery {
    allCompanies(sort: { fields: name, order: ASC }) {
      nodes {
        id
        name
        logo
        logoURL
        website
        blurb
        content
        created
        updated
        marketplaces {
          id
          flag
          code
          name
        }
        fields {
          slug
        }
        categories {
          id
          name
        }
        reviews {
          id
          title
          content
          created
          updated
          published
          rating
          tags
          helpful {
            username
            email
            photoURL
            created
            updated
          }
          user {
            username
            email
            photoURL
            role
            created
            updated
          }
        }
      }
    }
  }
`

export default Company
