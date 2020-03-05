module.exports = {
  siteMetadata: {
    title: `E-Seller Tools`,
    description: `A collection of e-commerce resources.  Primarily related to FBA, but also touching on many other aspects of e-commerce software and resources.`,
    author: `@gsheppard.yang`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `e-seller-tools`,
        short_name: `e-seller-tools`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        tailwind: true,
        purgeOnly: ["src/css/style.css", "src/css/global.css"]
      }
    },
    {
      resolve: 'gatsby-source-firestore',
      options: {
        credential: require("./firebase.json"),
        types: [
          {
            type: 'Reviews',
            collection: 'reviews',
            map: doc => ({
              categories: doc.categories,
              company: doc.company,
              content: doc.content,
              date: doc.date,
              marketplace: doc.marketplace,
              rating: doc.rating,
              tags: doc.tags,
              title: doc.title,
              username: doc.username,
              website: doc.website,
            }),
          },
          {
            type: 'Categories',
            collection: 'categories',
            map: doc => ({
              id: doc.id,
              name: doc.name,
            }),
          }
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
