import React from "react"

export const ExternalLink = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
    >
        {children}
    </a>
)

export const List = ({ children }) => <ul className="list-disc list-inside">{children}</ul>

export const Paragraph = ({ children }) => <p className="">{children}</p>
