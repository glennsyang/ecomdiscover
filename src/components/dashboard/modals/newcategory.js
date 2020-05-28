import React from "react"
import * as Constants from '../../../constants'

export default function NewCategory({ register, errors }) {
    return (
        <div className="relative p-6 flex-1">
            <div className="block text-left text-black lg:text-2xl text-xl font-bold">Name</div>
            <input
                type="text"
                name="name"
                placeholder="Name of the category..."
                ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
            />
            <div className="text-red-400 text-md">
                {errors.name && errors?.name?.message}
            </div>
        </div>
    )
}
