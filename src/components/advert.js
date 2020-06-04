import React from "react"
import { Link } from "gatsby"
import SVGImage from "../components/svgimage"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export default function Advert() {
    const { email } = useSiteMetadata()

    return (
        <div className="flex flex-col justify-around mx-auto border border-gray-300 rounded-lg shadow-lg p-6 ml-4 items-center advert-image">
            <Link to={'/contact'}>
                <SVGImage name="logo" width="100%" height="100%" viewBox="0 0 1450 400" className="lg:h-20 h-16 object-none border border-blue-500 bg-white rounded-lg shadow-2xl mx-auto px-4" />
            </Link>
            <span className="font-serif antialiased text-white text-lg font-semibold mx-auto mt-6">Want to advertise with us?</span>
            <a href={`mailto:${email}`} className="text-white antialiased text-sm font-bold mx-auto mt-4 hover:underline" rel="noopener noreferrer" target="_blank">Contact us!</a>
        </div>
    )
}
