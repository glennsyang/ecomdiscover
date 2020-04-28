import React, { useState } from "react"
import * as Constants from '../constants'

const Star = ({ selected = false, onClick = f => f }) => (
    <svg className={selected ? "w-8 h-8 fill-current text-blue-600" : "w-8 h-8 fill-current text-gray-400"} onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
);

const StarRating = ({ totalStars, name, register, required }) => {
    const [starsSelected, selectStar] = useState(0)

    return (
        <div className="flex relative items-center">
            <div className="flex flex-row justify-start text-2xl">
                {[...Array(totalStars)].map((n, i) => (
                    <Star
                        key={i}
                        selected={i < starsSelected}
                        onClick={() => selectStar(i + 1)}
                    />
                ))}
            </div>

            <input
                type="number"
                name={name}
                value={starsSelected}
                ref={register({
                    required: { value: true, message: Constants.FIELD_REQUIRED },
                    min: { value: 1, message: Constants.SELECT_RATING_1 },
                    max: { value: 5, message: Constants.SELECT_RATING_5 },
                })}
                readOnly
                hidden
                className="text-black"
            />
            <div className="flex flex-col font-bold text-xl text-blue-600 ml-4">
                {Constants.RATING_MESSAGE[starsSelected].starMessage}
            </div>
        </div>
    )
}
export default StarRating