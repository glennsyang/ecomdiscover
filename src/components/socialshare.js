import React from 'react'
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, EmailIcon, LinkedinIcon, FacebookIcon, TwitterIcon, TwitterShareButton } from "react-share"

export default function SocialShare({ title, shareUrl, body }) {
    return (
        <>
            <p className="text-2xl font-bold">Share this article</p>
            <div className="flex justify-start py-2">
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="mx-1">
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
                    className="mx-1">
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </div>
        </>
    )
}
