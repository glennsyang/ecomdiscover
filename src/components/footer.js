import React from "react"
import { Link } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import logo_image from "../images/logo_ecomdiscover.svg"

const Footer = () => {
    const { title } = useSiteMetadata()

    return (
        <footer className="bg-white">
            <hr className="border-b border-gray-200 my-0 py-0" />
            <div className="container mx-auto px-8 pb-4">
                <div className="w-full flex flex-col md:flex-row py-6">
                    <div className="flex-1 mb-6 text-center md:px-6 md:text-left">
                        {/* Logo */}
                        <Link to={`/`} title={title}>
                            <div>
                                <img src={logo_image} alt={`${title} Logo`} className="h-32 fill-current inline" />
                            </div>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <p className="uppercase text-black font-bold mb-6 md:mb-6">Links</p>
                        <ul className="list-reset mb-4">
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to={`/FAQ`} className="no-underline hover:underline text-gray-600 hover:text-blue-500">FAQ</Link>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to={`/help`} className="no-underline hover:underline text-gray-600 hover:text-blue-500">Help</Link>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to={`/support`} className="no-underline hover:underline text-gray-600 hover:text-blue-500">Support</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <p className="uppercase text-black font-bold mb-6 md:mb-6">Legal</p>
                        <ul className="list-reset mb-4">
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to={`/terms`} className="no-underline hover:underline text-gray-600 hover:text-blue-500">Terms</Link>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to={`/privacy`} className="no-underline hover:underline text-gray-600 hover:text-blue-500">Privacy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <p className="uppercase text-black font-bold mb-6 md:mb-6">Company</p>
                        <ul className="list-reset mb-6">
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to={`/dashboard/login`} className="no-underline hover:underline text-gray-600 hover:text-blue-500">Official Blog</Link>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to={`/about`} className="no-underline hover:underline text-gray-600 hover:text-blue-500">About Us</Link>
                            </li>
                            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                <Link to={`/contact`} className="no-underline hover:underline text-gray-600 hover:text-blue-500">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-blue-500 text-center px-6 pt-2 pb-4">
                <div className="text-gray-400 text-sm mt-3">
                    Copyright © {new Date().getFullYear()} {` `} {title} Inc. All rights reserved
                </div>
            </div>
        </footer >
    )
}

export default Footer