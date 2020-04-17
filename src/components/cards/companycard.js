import React from "react"
import { Link } from "gatsby"
import ImageFixed from "../image-fixed"
import AvgRating from "../avgrating"
import Category from "../category"
import { FaChevronRight } from 'react-icons/fa'

const CompanyCard = ({ company }) => {
    const props = {
        imgName: company.logo,
        imgAlt: `${company.name} Logo`,
        imgClass: ""
    }

    return (
        <div className="max-w-sm flex-grow rounded-lg overflow-hidden shadow-xl border border-gray-100 bg-white m-4 lg:mx-4">
            {/* Logo */}
            <div className="flex justify-center items-center h-24 md:h-32 lg:h-32">
                <Link to={company.fields.slug}>
                    <ImageFixed props={props} />
                </Link>
            </div>
            <hr className="border-b border-gray-300 opacity-25 py-0" />
            <div className="p-4">
                {/* Categories */}
                <div className="mb-4">
                    <Category categories={company.categories} className="inline-block bg-gray-100 border border-gray-200 rounded-md px-2 text-xs font-semibold text-blue-500 tracking-tight mr-1" />
                </div>
                <hr className="border-b border-gray-300 opacity-25 py-0" />
                <div className="font-semibold py-4">
                    <Link to={company.fields.slug}>
                        {company.name}
                    </Link>
                </div>
                <div className="flex pt-4 pb-4">
                    <AvgRating arrReviews={company.reviews} rating={null} slug={company.fields.slug} showAvgRating={true} showNumReviews={true} starSize="5" className="text-sm text-blue-500 pl-3" />
                </div>
                <div className="text-xs text-gray-700 pb-4">
                    {company.blurb}
                </div>
                <div className="text-xs text-gray-500 tracking-tight uppercase pb-2">
                    {company.marketplace.join(', ')}
                </div>
                <hr className="border-b border-gray-300 opacity-25 py-0" />
                <Link to={company.fields.slug} className="inline-block text-blue-500 text-xs hover:underline pt-4">
                    See Reviews
                    <FaChevronRight className="inline-block text-sm pl-2" />
                </Link>
            </div>
        </div>
    )
}

export default CompanyCard