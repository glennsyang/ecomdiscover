module.exports = {
  siteMetadata: {
    title: `E-Seller Tools`,
    description: `A collection of e-commerce resources.  Primarily related to FBA, but also touching on many other aspects of e-commerce software and resources.`,
    siteUrl: `https://www.esellertools.com`,
    website: `esellertools.com`,
    email: `info@esellertools.com`,
    phone: `604-555-1234`,
    address: `123 Main Street, Sometown, QC`,
    author: `@gsheppard.yang`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
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
            type: 'Categories',
            collection: 'categories',
            map: doc => ({
              id: doc.id,
              name: doc.name,
            }),
          },
          {
            type: 'Reviews',
            collection: 'reviews',
            map: doc => ({
              company: doc.company,
              content: doc.content,
              date: doc.date,
              logo: doc.logo,
              marketplace: doc.marketplace,
              rating: doc.rating,
              tags: doc.tags,
              title: doc.title,
              username: doc.username,
              website: doc.website,
              categories___NODE: doc.categories.map(category => category.id),
            }),
          },
          {
            type: 'Faq',
            collection: 'faq',
            map: doc => ({
              id: doc.id,
              title: doc.title,
              content: doc.content,
              published: doc.published,
              date: doc.date
            }),
          }
        ],
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `tags`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type Reviews, list how to resolve the fields` values
          Reviews: {
            title: node => node.title,
            tags: node => node.tags,
            slug: node => node.fields.slug,
          },
        },
        // Optional filter to limit indexed nodes
        filter: (node, getNode) =>
          node.tags !== 'exempt',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
