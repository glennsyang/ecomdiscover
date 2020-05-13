import React from "react"
import PropTypes from "prop-types"
import Header from "../dashboard/header"

function Layout({ children }) {
    return (
        <div className="leading-normal tracking-normal antialiased bg-white">
            <Header />
            <main>{children}</main>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;