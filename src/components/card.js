import React from "react"
import { Link } from "gatsby"
import ImageFixed from "./image-fixed"
import Tag from "../components/tag"

const Card = ({ review }) => {
    const props = {
        imgName: review.logo,
        imgAlt: `${review.company} Logo`,
        imgClass: "bg-white mx-6 mt-3"
    };

    let starRating = [];
    for (let i = 0; i < review.rating; i++) {
        starRating.push(
            <svg key={i} className="w-4 h-4 fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
        );
    }
    for (let i = review.rating; i < 5; i++) {
        starRating.push(
            <svg key={i} className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
        );
    }

    function truncateStr(str, n, useWordBoundary) {
        if (str.length <= n) { return str; }
        var subString = str.substr(0, n - 1);
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + "...";
    }

    return (
        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-md">
                <Link to={review.fields.slug}>

                    {/* Logo */}
                    <ImageFixed props={props} />

                    <div className="px-6 py-4">

                        {/* Star Rating */}
                        <div className="flex items-center mb-2">
                            {starRating}
                        </div>

                        {/* Categories */}
                        <p className="text-gray-500 text-xs mt-2">
                            Categories:{review.categories.map((category) =>
                                <span key={category.id} className="ml-1">{category.name}, </span>
                            )}
                        </p>

                        {/* Review */}
                        <div className="text-gray-700 text-base mt-4" dangerouslySetInnerHTML={{ __html: truncateStr(review.content, 250, true) }} />
                    </div>

                    {/* Tags */}
                    <div className="px-6">
                        <Tag tags={review.tags} />
                    </div>
                </Link>

                <div className="flex items-center justify-center py-4">
                    <Link to={review.fields.slug} className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">Read More</Link>
                </div>

            </div>
        </div>
    )
}

export default Card