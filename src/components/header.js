import React from "react"
import PropTypes from 'prop-types'
import { Link } from "gatsby"

function Header({ siteTitle }) {
  //const Header = ({ siteTitle }) => {
  return (
    <nav id="header" className="fixed w-full z-30 top-0 text-white bg-white shadow">

      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">

        <div className="pl-4 flex items-center uppercase">
          <Link to="/" className="toggleColour no-underline hover:no-underline font-bold text-2xl lg:text-4xl text-gray-800">
            <svg className="mb-2 h-8 fill-current inline" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 949.434 949.434" enable-background="new 0 0 949.434 949.434" space="preserve">
              <g>
                <g>
                  <path className="plane-take-off" d="M949.434,224.27l-587.341,0.225l8.312-93.217H200.27v65h49.888h49.192l-2.699,30.287l-14.007,157.11H0v65h276.85 l-4.283,48.044H143.529v65h123.243l-2.67,29.946h553.891L949.434,224.27z M335.155,526.666l6.953-77.99h53.195v-65h-47.4 l8.396-94.179l500.834-0.191l-84.919,237.36H335.155z" />
                  <path className="plane-take-off" d="M626.999,786.956c16.736,19.827,42.046,31.199,69.442,31.199c53.688,0,102.879-41.885,111.985-95.355 c4.705-27.622-2.319-54.983-19.272-75.068c-16.736-19.827-42.046-31.199-69.442-31.199h-374.45 c-53.688,0-102.879,41.885-111.986,95.354c-4.705,27.623,2.32,54.985,19.273,75.07c16.736,19.827,42.046,31.199,69.441,31.199 c53.688,0,102.878-41.885,111.985-95.355c2.408-14.139,1.736-28.207-1.761-41.269h185.457c-4.72,9.498-8.132,19.695-9.948,30.354 C603.021,739.509,610.045,766.87,626.999,786.956z M365.033,689.656c4.643,5.501,6.372,13.396,4.867,22.229 c-3.745,21.984-26.133,41.271-47.909,41.271c-8.447,0-15.284-2.811-19.771-8.125c-4.644-5.501-6.372-13.396-4.867-22.23 c3.745-21.983,26.133-41.269,47.909-41.269C353.709,681.531,360.546,684.341,365.033,689.656z M739.483,689.656 c4.643,5.501,6.372,13.396,4.866,22.229c-3.744,21.984-26.132,41.271-47.908,41.271c-8.448,0-15.284-2.811-19.771-8.125 c-4.644-5.501-6.372-13.396-4.867-22.23c3.745-21.983,26.132-41.269,47.909-41.269 C728.159,681.531,734.996,684.341,739.483,689.656z" />
                  <rect x="78.951" y="274.902" width="174.728" height="65" />
                  <rect fill="#2a2a31" x="16.539" y="900.626" width="929.767" height="50.502" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)" />
                </g>
              </g>
            </svg> {siteTitle}
          </Link>
        </div>

        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20 justify-end flex-1" id="nav-content">
          <Link to="/" className="mr-5 py-2 px-4 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500">Log In</Link>
          <form action="#">
            <button type="submit" id="navAction" className="mx-auto lg:mx-0 hover:underline bg-blue-500 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 text-white gradient">Sign Up</button>
          </form>

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