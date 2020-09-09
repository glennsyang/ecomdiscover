import React from "react"

const Accordion = ({ question }) => {
    return (
        <div className="flex-1 mt-2">
            <input type="checkbox" name="panel" aria-label="Expand accordion" id={`panel-${question.id}`} className="hidden" />
            <label htmlFor={`panel-${question.id}`} className="relative block bg-white text-gray-600 p-4 shadow border-b border-grey">
                {question.question}
            </label>
            <div className="accordion__content overflow-hidden bg-grey-lighter">
                <p className="accordion__body text-gray-500 p-4" id={`panel${question.id}`}
                    dangerouslySetInnerHTML={{ __html: question.answer }}>
                </p>
            </div>
        </div>
    )
}

export default Accordion