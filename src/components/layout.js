import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby";

import Header from "./header"
import Footer from "./footer"

function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <body className="leading-normal tracking-normal text-white gradient">
          <Header siteTitle={data.site.siteMetadata.title} />
          <div>
            <main>{children}</main>
          </div>
          <Footer siteTitle={data.site.siteMetadata.title} />
        </body>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;