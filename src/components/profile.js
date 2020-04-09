import React from "react"
import { Link } from 'gatsby'
import AuthenticationView from "../components/authenticationview"
import ImageFluid from "../components/image-fluid"
import { getUser } from "../utils/auth"
import moment from "moment"

const Profile = () => {
    const user = getUser()
    const { displayName, email, emailVerified, photoURL } = user
    //const accessToken = user.stsTokenManager.accessToken
    const createdAt = moment(+user.createdAt).format("D MMMM YYYY");
    const imgProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `${user.displayName} Profile`,
        imgClass: "h-full w-full object-cover"
    }

    return (
        <AuthenticationView title="My Profile">
            <div className="flex flex-col lg:flex-row lg:flex-grow mt-6">
                {/* Avatar */}
                <div className="lg:w-32 flex">
                    <Link title={`${displayName}`} to={`/app/profile`} className="h-20 w-20 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                        <ImageFluid props={imgProfile} />
                    </Link>
                </div>
                <div className="lg:w-full flex flex-col">
                    <h3 className="flex text-base font-bold text-black">
                        {displayName ?? '{displayName}'}
                    </h3>
                    <div className="flex pt-2">
                        <span className="text-gray-500 text-sm lg:text-xs">Member Since:</span>
                        <span className="text-gray-500 text-sm lg:text-xs pl-1">{createdAt}</span>
                    </div>
                    <div className="flex pt-2">
                        <span className="text-gray-500 text-sm lg:text-xs">Email:</span>
                        <span className="text-gray-500 text-sm lg:text-xs pl-1">{`${email}`}</span>
                    </div>
                    <div className="flex pt-2">
                        <span className="text-gray-500 text-sm lg:text-xs">Verified:</span>
                        <span className="text-gray-500 text-sm lg:text-xs pl-1">{`${emailVerified}`}</span>
                    </div>
                    <div className="flex pt-2">
                        <span className="text-gray-500 text-sm lg:text-xs">Photo:</span>
                        <span className="text-gray-500 text-sm lg:text-xs pl-1">{`${photoURL}`}</span>
                    </div>
                </div>
            </div>
        </AuthenticationView>
    )
}

export default Profile