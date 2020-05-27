import React from "react"
import * as Constants from '../../../constants'

export default function NewFAQ({ register, errors }) {
    return (
        <div className="relative p-6 flex-1">
            <div className="block text-left text-black lg:text-2xl text-xl font-bold">Question</div>
            <input
                type="text"
                name="question"
                placeholder="Question...?"
                ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
            />
            {errors.question && <span className="text-red-400 text-md">{errors?.question?.message}</span>}

            <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-2">Answer</div>
            <textarea
                type="text"
                name="answer"
                placeholder="Answer to the question..."
                ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400 h-40"
            />
            {errors.answer && <span className="text-red-400 text-md">{errors?.answer?.message}</span>}
        </div>
    )
}
