import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Footer = ({ siteTitle }) => {
    return (
        <footer>
            <div>
                <h1>
                    <Link to="/">
                        Copyright © {new Date().getFullYear()} - {` `} E-Seller Tools Inc.
                    </Link>
                </h1>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    siteTitle: PropTypes.string,
}

Footer.defaultProps = {
    siteTitle: ``,
}

export default Footer