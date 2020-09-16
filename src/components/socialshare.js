import React from 'react'
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, EmailIcon, LinkedinIcon, FacebookIcon, TwitterIcon, TwitterShareButton } from "react-share"

export default function SocialShare({ title, shareUrl, body, hashtags, type }) {
    return (
        <>
            <p className="text-base lg:text-2xl font-bold">Share this {type}</p>
            <div className="flex justify-end sm:justify-start py-2">
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    hashtags={hashtags}
                    className="mr-1">
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    className="mx-1">
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <LinkedinShareButton url={shareUrl} className="mx-1">
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <EmailShareButton
                    url={shareUrl}
                    subject={title}
                    body={body}
                    className="ml-1">
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </div>
        </>
    )
}
