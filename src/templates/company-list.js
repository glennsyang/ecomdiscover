import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import CompanyCard from "../components/cards/companycard"
import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'

const CompanyList = ({ data, pageContext }) => {
  const title = "E-Commerce Tools & Services"
  const subtitle = ""
  const companies = data.allCompanies.edges
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <SEO
        title="Companies"
        keywords={companies.map(({ node }) => { return node.name })}
        description={`${title}: ${companies.map(({ node }) => { return node.name }).join(', ')}`}
      />
      <section className="bg-gray-100">
        <PageHeader title={title} subtitle={subtitle} />
        <div className="container mx-auto pb-12">
          <div className="w-full flex flex-wrap justify-evenly pt-6">
            {companies.map(({ node }) => {
              return <CompanyCard key={node.id} company={node} />
            })}
          </div>
          <div className="flex flex-wrap justify-between mt-4 mx-4 xl:mx-0">
            {isFirst ? <div className="px-4" /> : (
              <Link to={`/companies/${prevPage}`} rel="prev" className="antialised bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                <FaChevronLeft size={15} className="inline-block text-sm pr-2" />
                Prev
              </Link>
            )}
            <div className="inline-flex items-center mt-2">
              {Array.from({ length: numPages }, (_, i) => (
                <Link
                  key={`pagination-number${i + 1}`}
                  to={`/companies/${i === 0 ? "" : i + 1}`}
                  className="antialised text-blue-700 font-semibold inline-flex items-center underline px-4"
                >
                  {i + 1}
                </Link>
              ))}
            </div>
            {isLast ? <div className="px-4" /> : (
              <Link to={`/companies/${nextPage}`} rel="next" className="antialised bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                Next
                <FaChevronRight size={15} className="inline-block text-sm pl-2" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </Layout >
  )
}

export const pageQuery = graphql`
  query companyListQuery($skip: Int!, $limit: Int!) {
    allCompanies(
      sort: { fields: name, order: ASC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
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
  }
`

export default CompanyList
