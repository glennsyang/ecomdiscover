console.log(`NODE_ENV: '${process.env.NODE_ENV}'`);

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`, })

module.exports = {
  siteMetadata: {
    title: `EcomDiscover`,
    description: `Find Top-Rated Tools & Services For Your Ecommerce Business.`,
    subtitle: `Search our curated collection of e-commerce resources`,
    siteUrl: `https://www.ecomdiscover.com`,
    website: `ecomdiscover.com`,
    email: `info@ecomdiscover.com`,
    phone: `604-555-1234`,
    address: `123 Main Street, Sometown, QC`,
    author: `@gsheppard.yang`,
    twitter: `https://twitter.com/EcomDiscover`,
    facebook: `https://www.facebook.com/ecomdiscovernow`,
    affiliateDisclaimer: `Some of the links contained on this site are affiliate links. If you use these links to try out a service we may earn a commission which supports the function of the site. Thank you very much.`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              quality: 100,
              //showCaptions: true,
              backgroundColor: 'none',
              disableBgImage: true
            }
          },
          {
            resolve: `gatsby-remark-image-attributes`,
            options: {
              styleAttributes: true,
              dataAttributes: true
            }
          }
        ],
      },
    },
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
        name: `EcomDiscover`,
        short_name: `ecomdiscover`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        exclude: [`/dashboard/*`, `/app/*`],
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
        //credential: require("./firebase.json"),
        credential: {
          type: process.env.GATSBY_FIREBASE_TYPE,
          project_id: process.env.GATSBY_FIREBASE_PROJECT_ID,
          private_key_id: process.env.GATSBY_FIREBASE_PRIVATE_KEY_ID,
          //private_key: process.env.GATSBY_FIREBASE_PRIVATE_KEY,
          private_key: process.env.GATSBY_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          client_email: process.env.GATSBY_FIREBASE_CLIENT_EMAIL,
          client_id: process.env.GATSBY_FIREBASE_CLIENT_ID,
          auth_uri: process.env.GATSBY_FIREBASE_AUTH_URI,
          token_uri: process.env.GATSBY_FIREBASE_TOKEN_URI,
          auth_provider_x509_cert_url: process.env.GATSBY_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: process.env.GATSBY_FIREBASE_CLIENT_X509_CERT_URL,
        },
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
              content: doc.content,
              created: doc.created,
              updated: doc.updated,
              marketplaces___NODE: doc.marketplaces.map(marketplace => marketplace.id),
              user___NODE: doc.uid.id,
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
              updated: doc.updated,
              rating: doc.rating,
              tags: doc.tags,
              title: doc.title,
              published: doc.published,
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
              reviews___NODE: doc.reviews.map(review => review.id),
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
              question: doc.question,
              answer: doc.answer,
              date: doc.date
            }),
          },
          {
            type: 'Tags',
            collection: 'tags',
            map: doc => ({
              id: doc.id,
              tag: doc.tag,
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-163163814-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        //anonymize: true,
        // Setting this parameter is also optional
        //respectDNT: true,
        // Avoids sending pageview hits from custom paths
        //exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        //pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        //optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        //experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        //variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Defers execution of google analytics script after page load
        //defer: false,
        // Any additional optional fields
        //sampleRate: 5,
        //siteSpeedSampleRate: 10,
        //cookieDomain: "example.com",
      },
    },
    {
      resolve: `gatsby-transformer-rehype`,
      options: {
        // Condition for selecting an existing GrapghQL node (optional)
        // If not set, the transformer operates on file nodes.
        filter: node => node.internal.type === `Reviews` || node.internal.type === `Companies`,
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
        emitParseErrors: true,
        // Verbose mode (optional, default: false)
        verbose: true,
        // Plugins configs (optional but most likely you need one)
        //plugins: [],
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`name`, `categories`, `title`, `tags`, `content`],
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
            content: node => node.content,
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
