import React, { useState } from "react";

const Star = ({ selected = false, onClick = f => f }) => (
    <svg className={selected ? "w-8 h-8 fill-current text-blue-600" : "w-8 h-8 fill-current text-gray-400"} onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
);

const StarRating = ({ totalStars }) => {
    const [starsSelected, selectStar] = useState(0);

    const ratingMsg = [
        { stars: 0, starMessage: "" },
        { stars: 1, starMessage: "Terrible" },
        { stars: 2, starMessage: "Poor" },
        { stars: 3, starMessage: "Average" },
        { stars: 4, starMessage: "Very Good" },
        { stars: 5, starMessage: "Excellent" },
    ]

    return (
        <div className="relative">
            <div className="flex flex-row justify-start text-2xl">
                {[...Array(totalStars)].map((n, i) => (
                    <Star
                        key={i}
                        selected={i < starsSelected}
                        onClick={() => selectStar(i + 1)}
                    />
                ))}

            </div>
            <div className="absolute flex flex-row font-bold text-xl text-blue-600">
                {ratingMsg[starsSelected].starMessage}
            </div>
        </div>
    )
}
export default StarRating