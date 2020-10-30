import React from "react"
import ImageFixed from "../../components/image-fixed"

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

export const LineBreak = ({ children }) => <br>{children}</br>

export const Image = ({ src, alt, height, children }) => {
    console.log(src, alt, height)
    const props = {
        imgName: src,
        imgAlt: alt,
        imgClass: "h-auto w-auto rounded mt-8"
    }
    return (
        <ImageFixed props={props} />)
}
