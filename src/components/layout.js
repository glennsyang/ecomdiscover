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
        <div className="leading-normal tracking-normal text-white gradient">
          <Header siteTitle={data.site.siteMetadata.title} />
          <main className="mt-12">{children}</main>
          <Footer siteTitle={data.site.siteMetadata.title} />
        </div>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;