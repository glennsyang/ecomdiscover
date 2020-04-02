import React from "react"
import PropTypes from 'prop-types'
import { Link } from "gatsby"
import Logo from "../components/logo"
//import logo_image from "../images/logo_2.png"
//import logo_image from "../images/logo_ecomdiscover.svg"
// <img src={logo_image} alt={`${siteTitle} Logo`} className="h-12 fill-current inline" />

function Header({ siteTitle }) {
  return (
    <nav id="header" className="fixed w-full z-30 top-0 text-white bg-white shadow">

      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">

        <div className="flex pl-4">
          {/* Logo */}
          <Link to={`/`}>
            <div className="pb-2/3">
              <Logo width="100%" height="100%" viewBox="0 0 1450 400" className="lg:h-16 h-12 object-cover" />
            </div>
          </Link>
        </div>

        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20 justify-end flex-1" id="nav-content">
          <Link to={`/login`} className="mr-5 py-2 px-4 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500">
            Log In
          </Link>
          <Link to={`/signup`} className="mx-auto lg:mx-0 hover:underline bg-blue-500 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 text-white gradient">
            Sign Up
          </Link>
        </div>
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