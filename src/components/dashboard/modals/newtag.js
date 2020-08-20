import React from "react"
import * as Constants from '../../../constants'

export default function NewTAG({ register, errors, rowProps }) {
    return (
        <div className="relative p-6 flex-1">
            <div className="block text-left text-black lg:text-2xl text-xl font-bold">Tag</div>
            <input
                type="text"
                name="tag"
                placeholder="Please enter the name of the tag"
                defaultValue={rowProps ? rowProps.tag : ''}
                aria-label="Tag"
                ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
            />
            {errors.tag && <span className="text-red-400 text-md">{errors?.tag?.message}</span>}

        </div>
    )
}
