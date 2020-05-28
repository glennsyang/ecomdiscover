import React from "react"
import { Link, navigate } from "@reach/router"
import { getUser, isLoggedIn, logout } from "../../utils/auth"
import firebase from "gatsby-plugin-firebase"

const ShareReviewButton = (props) => {
    const { buttonName, className } = props
    return (
        <Link
            to={isLoggedIn() ? '/app/writereview' : '/app/login'}
            state={{ fromShare: true }}
            title={isLoggedIn() ? 'Share!' : 'Please log-in to share a review'}
            className={className}>
            {buttonName}
        </Link>
    )
}

export default (props) => {
    const { isOpen } = props
    let details
    if (!isLoggedIn()) {
        details = (
            <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20 justify-end flex-1 lg:mr-8" id="nav-content">
                <ShareReviewButton buttonName="Share Review" className="py-2 px-4 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500" />
                <Link to={`/app/login`} className="mr-5 py-2 px-4 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500">
                    Sign In
                </Link>
                <Link to={`/app/signup`} className="mx-auto lg:mx-0 hover:underline bg-blue-500 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 text-white gradient">
                    Sign Up
                </Link>
            </div>
        )
    } else {
        const { email } = getUser()
        details = (
            <>
                <ShareReviewButton buttonName="Share Review" className="block py-2 px-1 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500 sm:mt-2 mx-2" />
                <Link to={`/app/profile`} title={email} className="mt-1 block py-2 px-1 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500 sm:mt-2 mx-2">
                    My Profile
                </Link>
                {` `}
                <a href="/"
                    onClick={event => {
                        event.preventDefault();
                        logout(firebase).then(() =>
                            navigate(`/`)
                        )
                    }}
                    className="w-32 sm:w-auto mt-1 block py-4 px-8 hover:underline font-bold rounded-full shadow opacity-75 text-white gradient sm:mt-0 sm:ml-3">
                    Log Out
                </a>
            </>
        )
    }

    return (
        <nav className={isOpen ? 'block px-2 pt-2 pb-4 sm:flex sm:p-0' : 'hidden px-2 pt-2 pb-4 sm:flex sm:p-0'}>
            {details}
        </nav>
    )
}