import React from "react"
import { Link, navigate } from "@reach/router"
import { getUser, isLoggedIn, logout } from "../utils/auth"
import firebase from "gatsby-plugin-firebase"

export default () => {
    //const [firebase, setFirebase] = useState();

    //useEffect(() => {
    //    setFirebase(firebase)
    //}, [firebase])

    let details;
    if (!isLoggedIn()) {
        details = (
            <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20 justify-end flex-1 lg:mr-8" id="nav-content">
                <Link to={`/app/login`} className="mr-5 py-2 px-4 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500">
                    Log In
                </Link>
                <Link to={`/app/signup`} className="mx-auto lg:mx-0 hover:underline bg-blue-500 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 text-white gradient">
                    Sign Up
                </Link>
            </div>
        )
    } else {
        const { email } = getUser()
        details = (
            <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20 justify-end flex-1 lg:mr-8" id="nav-content">
                <Link to={`/app/profile`} className="mr-5 py-2 px-4 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500">
                    Profile: {email}
                </Link>
                {` `}
                <a
                    href="/"
                    onClick={event => {
                        event.preventDefault();
                        logout(firebase).then(() =>
                            navigate(`/app/login`)
                        )
                    }}
                    className="mx-auto lg:mx-0 hover:underline bg-blue-500 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 text-white gradient">
                    Log Out
                </a>
            </div>
        )
    }

    return <div>{details}</div>
}