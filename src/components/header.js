import React, { useState } from "react"
import { Link } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import Logo from "../components/logo"
import Status from "./authentication/status"

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { title } = useSiteMetadata()

  return (
    <header className="w-full container mx-auto sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 sticky">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        {/* Logo */}
        <div>
          <Link to={`/`} title={title}><Logo width="100%" height="100%" viewBox="0 0 1450 400" className="lg:h-16 h-12 object-cover" /></Link>
        </div>
        <div className="sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)} type="button" className="block text-gray-500 hover:text-white focus:text-white focus:outline-none">
            <svg className="h-6 w-6 fill-current text-blue-500" viewBox="0 0 24 24">
              {isOpen &&
                <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              }
              {!isOpen &&
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />}
            </svg>
          </button>
        </div>
      </div>
      <Status isOpen={isOpen} />
    </header>
  )
}

export default Header

//<hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
