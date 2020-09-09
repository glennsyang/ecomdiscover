import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
    const { site } = useStaticQuery(graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            description
            siteUrl
            website
            email
            phone
            address
            author
          }
        }
      }
    `)

    return site.siteMetadata
}