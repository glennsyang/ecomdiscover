require('dotenv').config({ path: '.env' })

module.exports = {
  siteMetadata: {
    title: `Ecom Discover`,
    description: `A collection of e-commerce resources.  Primarily related to FBA, but also touching on many other aspects of e-commerce software and resources.`,
    siteUrl: `https://www.ecomdiscover.com`,
    website: `ecomdiscover.com`,
    email: `info@ecomdiscover.com`,
    phone: `604-555-1234`,
    address: `123 Main Street, Sometown, QC`,
    author: `@gsheppard.yang`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
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
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
        prefixes: [`/app/*`, `/dashboard/*`]
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
            type: 'Companies',
            collection: 'companies',
            map: doc => ({
              id: doc.id,
              name: doc.name,
              logo: doc.logo,
              logoURL: doc.logoURL,
              website: doc.website,
              blurb: doc.blurb,
              created: doc.created,
              marketplaces___NODE: doc.marketplaces.map(marketplace => marketplace.id),
              categories___NODE: doc.categories.map(category => category.id),
              reviews___NODE: doc.reviews.map(review => review.id),
            }),
          },
          {
            type: 'Reviews',
            collection: 'reviews',
            map: doc => ({
              id: doc.id,
              content: doc.content,
              created: doc.created,
              rating: doc.rating,
              tags: doc.tags,
              title: doc.title,
              helpful___NODE: doc.helpful.map(user => user.id),
              user___NODE: doc.uid.id,
              company___NODE: doc.company.id,
              categories___NODE: doc.categories.map(category => category.id),
            }),
          },
          {
            type: 'Users',
            collection: 'users',
            map: doc => ({
              id: doc.id,
              username: doc.displayName,
              email: doc.email,
              photoURL: doc.photoURL,
              role: doc.role,
              created: doc.created,
              updated: doc.updated,
              helpful___NODE: doc.helpful.map(review => review.id),
            }),
          },
          {
            type: 'Marketplaces',
            collection: 'marketplaces',
            map: doc => ({
              id: doc.id,
              code: doc.code,
              name: doc.name,
              flag: doc.flag,
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
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          auth: true,
          firestore: true,
          storage: true,
          analytics: true,
        },
        credentials: {
          apiKey: process.env.GATSBY_FIREBASE_API_KEY,
          authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
          projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
          storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.GATSBY_FIREBASE_APP_ID,
          measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID
        }
      }
    },
    {
      resolve: `gatsby-transformer-rehype`,
      options: {
        // Condition for selecting an existing GrapghQL node (optional)
        // If not set, the transformer operates on file nodes.
        filter: node => node.internal.type === `Reviews`,
        // Only needed when using filter (optional, default: node.html)
        // Source location of the html to be transformed
        source: node => node.content,
        // Additional fields of the sourced node can be added here (optional)
        // These fields are then available on the htmlNode on `htmlNode.context`
        //contextFields: [],
        // Fragment mode (optional, default: true)
        fragment: true,
        // Space mode (optional, default: `html`)
        space: `html`,
        // EmitParseErrors mode (optional, default: false)
        emitParseErrors: false,
        // Verbose mode (optional, default: false)
        verbose: false,
        // Plugins configs (optional but most likely you need one)
        //plugins: [],
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`name`, `categories`, `title`, `tags`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type Reviews, list how to resolve the fields` values
          Companies: {
            type: node => "companies",
            name: node => node.name,
            categories: (node, getNode) => node.categories___NODE.map(catNode => getNode(catNode).name),
            slug: node => node.fields.slug,
          },
          Reviews: {
            type: node => "reviews",
            title: node => node.title,
            tags: node => node.tags,
            company: node => node.company___NODE,
          },
        },
        // Optional filter to limit indexed nodes
        //filter: (node, getNode) =>
        //  node.tags !== 'exempt',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
