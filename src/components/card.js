import React from "react"
import { Link } from "gatsby"
import logo_sellics from "../images/logo_sellics.png";

const Card = ({ review }) => {

    let starRating = [];
    for (let i = 0; i < review.starRating; i++) {
        starRating.push(<svg key={i} className="w-4 h-4 fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>);
    }
    for (let i = review.starRating; i < 5; i++) {
        starRating.push(<svg key={i} className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>);
    }

    return (
        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-md">
                <Link to={`/review`} review={review}>

                    {/* Logo */}
                    <img className="bg-white mx-6 mt-3" src={logo_sellics} alt="Company Logo" />

                    <div className="px-6 py-4">

                        {/* Star Rating */}
                        <div className="flex items-center mb-2">
                            {starRating}
                        </div>

                        {/* Categories */}
                        <p className="text-gray-500 text-xs mt-2">
                            Categories: {review.categories.join(', ')}
                        </p>

                        {/* Review */}
                        <p className="text-gray-700 text-base mt-4">
                            {review.blurb}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="px-6">
                        {review.tags.map(
                            (tag, i) => <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mt-2 mr-2">{tag}</span>
                        )}
                    </div>
                </Link>

                {review.displayButton &&
                    <div className="flex items-center justify-center py-4">
                        <Link to={`/review`} className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Read More</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Card