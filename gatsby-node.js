const path = require(`path`)
//const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Companies`) {
    const slug = `reviews/${node.name.toLowerCase().split(' ').join('-')}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  if (node.internal.type === `MarkdownRemark`) {
    const slug = `blog/${node.frontmatter.filename.replace(/\?/g, "").toLowerCase()}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allCompanies {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  // Create company-list pages
  const companies = result.data.allCompanies.edges
  const companiesPerPage = 39
  const numPages = Math.ceil(companies.length / companiesPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/companies` : `/companies/${i + 1}`,
      component: path.resolve("./src/templates/company-list.js"),
      context: {
        limit: companiesPerPage,
        skip: i * companiesPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
  companies.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/company.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blogpost.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}