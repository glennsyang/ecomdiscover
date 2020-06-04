import React from "react"
import * as Constants from '../../../constants'

export default function NewMarketplace({ register, errors }) {
    return (
        <div className="relative p-6 flex-1">
            <div className="block text-left text-black lg:text-2xl text-xl font-bold">Code</div>
            <input
                type="text"
                name="code"
                placeholder="3-letter Country Code"
                ref={register({
                    required: { value: true, message: Constants.FIELD_REQUIRED },
                    maxLength: { value: 3, message: "Must be only 3 characters." },
                    minLength: { value: 3, message: "Must be at least 3 characters." }
                })}
                className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
            />
            {errors.code && <span className="text-red-400 text-md">{errors?.code?.message}</span>}
        </div>
    )
}
