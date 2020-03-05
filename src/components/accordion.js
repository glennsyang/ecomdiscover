import React from "react"

const Accordion = ({ question }) => {
    return (
        <div className="flex-1 mt-2">
            <input type="checkbox" name="panel" id={`panel-${question.frontmatter.id}`} className="hidden" />
            <label htmlFor={`panel-${question.frontmatter.id}`} className="relative block bg-white text-gray-600 p-4 shadow border-b border-grey">
                {question.frontmatter.title}
            </label>
            <div className="accordion__content overflow-hidden bg-grey-lighter">
                <h2 className="accordion__header text-gray-600 pt-4 pl-4">{question.frontmatter.header}</h2>
                <p className="accordion__body text-gray-500 p-4" id={`panel${question.frontmatter.id}`}
                    dangerouslySetInnerHTML={{ __html: question.html }}>
                </p>
            </div>
        </div>
    )
}

export default Accordion