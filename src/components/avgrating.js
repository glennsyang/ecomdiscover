import React from "react"
import { Link } from "gatsby"

const AvgRating = (props) => {
    const { arrReviews, rating, slug, showAvgRating, showNumReviews, starSize, className } = props

    const avgRating = arrReviews ? arrReviews.reduce((a, b) => {
        return b.rating == null ? a : a + b.rating
    }, 0) / arrReviews.length : rating;

    let starRating = [];
    for (let i = 0; i < Math.round(avgRating); i++) {
        starRating.push(<svg key={i} className={`w-${starSize} h-${starSize} fill-current text-blue-600`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>);
    }
    for (let i = Math.round(avgRating); i < 5; i++) {
        starRating.push(<svg key={i} className={`w-${starSize} h-${starSize} fill-current text-gray-400`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>);
    }
    return (
        <>
            {starRating}
            {showAvgRating
                ? <span className="text-sm text-black font-bold pl-2">{avgRating}/5</span>
                : <span></span>
            }
            {showNumReviews
                ? <span className={className}>
                    <Link to={slug} className="hover:underline">
                        {arrReviews.length} Reviews
                    </Link>
                </span>
                : <span></span>
            }
        </>
    )
}

export default AvgRating