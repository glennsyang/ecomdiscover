# E-Seller Tools Directory & Review


## About

A collection of e-commerce resources. Primarily related to FBA, but also touching on many other aspects of e-commerce software and resources.


## Built With

[Gatsby](https://github.com/gatsbyjs/gatsby)

[Material-UI](https://github.com/mui-org/material-ui)

## Based On

[Material UI Gatsby Starter](https://github.com/mui-org/material-ui/tree/master/examples/gatsby)

[Material UI Album Template](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/album)


query {
    allReviews(sort: { fields: date, order: ASC }) {
      totalCount
        edges {
            node {
                company
                content
                date(formatString: "DD MMMM, YYYY")
                logo
                id
                fields {
                  slug
                }
                marketplace
                rating
                tags
                title
                username
                website
                categories {
                  id
                  name
                }
            }
        }
    }
}