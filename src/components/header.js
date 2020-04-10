import React from "react"
import PropTypes from 'prop-types'
import { Link } from "gatsby"
import Logo from "../components/logo"
import Status from "./Authentication/status"

function Header({ siteTitle }) {
  return (
    <nav id="header" className="sticky w-full z-30 top-0 text-white bg-white shadow">

      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">

        <div className="flex pl-4">
          {/* Logo */}
          <Link to={`/`} title={siteTitle}>
            <div className="pb-2/3">
              <Logo width="100%" height="100%" viewBox="0 0 1450 400" className="lg:h-16 h-12 object-cover" />
            </div>
          </Link>
        </div>

        <Status />

      </div>

      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;