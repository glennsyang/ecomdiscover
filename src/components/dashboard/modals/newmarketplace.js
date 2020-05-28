import React from "react"
import * as Constants from '../../../constants'

export default function NewMarketplace({ register, errors }) {
    return (
        <div className="relative p-6 flex-1">
            <div className="block text-left text-black lg:text-2xl text-xl font-bold">Code</div>
            <input
                type="text"
                name="code"
                placeholder="Country Code"
                ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
            />
            {errors.code && <span className="text-red-400 text-md">{errors?.code?.message}</span>}

            <div className="block text-left text-black lg:text-2xl text-xl font-bold">Name</div>
            <input
                type="text"
                name="name"
                placeholder="Country Name"
                ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
            />
            {errors.name && <span className="text-red-400 text-md">{errors?.name?.message}</span>}

            <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-2">Flag</div>
            <input
                type="text"
                name="flag"
                placeholder="Country flag in SVG"
                ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
            />
            {errors.flag && <span className="text-red-400 text-md">{errors?.flag?.message}</span>}
        </div>
    )
}
