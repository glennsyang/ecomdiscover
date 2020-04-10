import React from "react"
import { navigate } from "gatsby"
import AuthenticationView from "./authenticationview"
import ImageFluid from "../image-fluid"
import { getUser, setUser } from "../../utils/auth"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"

const Profile = () => {
    const user = getUser()
    const { displayName, email, emailVerified, photoURL, createdAt } = user

    const memberSince = moment(+createdAt).format("D MMMM YYYY")
    const signInMethods = user.providerData.map(profile => {
        if (profile.providerId === "password") {
            return "Email/Password"
        }
        return profile.providerId
    })
    const imgProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `${displayName} Profile Photo`,
        imgClass: "h-full w-full object-cover"
    }
    // Buttons
    const handleEditProfile = () => {
        firebase.auth().onAuthStateChanged(currentUser => {
            if (currentUser) {
                console.log("Current user:", currentUser)
                currentUser
                    .updateProfile({
                        //displayName: "Glenn Sheppard",
                        //photoURL: null
                    })
                    .then(() => {
                        setUser(currentUser)
                        navigate('/app/profile')
                    })
                    .catch(error => {
                        console.log("Error:", error)
                        alert('An error occurred. Unable to update profile:' + email)
                    })
            }
        })
    }
    const handleChangeSignIn = () => {
        alert('Not Available')
    }
    const handleDeleteAccount = () => {
        const currentUser = firebase.auth().currentUser;
        currentUser
            .delete()
            .then(() => {
                setUser({});
                navigate('/app/login');
            })
            .catch(error => {
                console.log("Error:", error)
                alert('An error occured. Unable to deactivate account:' + email)
            })
    }

    return (
        <AuthenticationView title="Profile">
            {/* Card */}
            <div className="flex flex-col lg:flex-row lg:flex-grow lg:mt-6 shadow-xl rounded-lg border border-gray-100 p-10">

                <div className="flex flex-col lg:flex-row lg:flex-grow">
                    {/* Avatar */}
                    <div className="lg:w-32 flex">
                        <div className="h-20 w-20 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                            {photoURL ? <img src={photoURL} alt="profile" /> : <ImageFluid props={imgProfile} />}
                        </div>
                    </div>
                    {/* User Details */}
                    <div className="lg:w-full flex flex-col mt-4 md:mt-0 lg:mt-0">
                        <div className="flex flex-col lg:flex-row lg:flex-grow pb-4">
                            <div className="lg:w-3/5">
                                <h3 className="flex text-base font-bold text-black">
                                    {displayName ?? '{displayName}'}
                                </h3>
                                <div className="flex pt-2">
                                    <span className="text-gray-500 text-sm lg:text-xs">Member Since:</span>
                                    <span className="text-gray-500 text-sm lg:text-xs pl-1">{memberSince}</span>
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
                            <div className="lg:w-2/5">
                                <div className="float-right">
                                    <button name="edit" onClick={handleEditProfile} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                                        Edit Profile
                                </button>
                                </div>
                            </div>
                        </div>

                        <hr className="border-b border-gray-400 opacity-25 py-0" />

                        <div className="flex flex-col lg:flex-row lg:flex-grow py-6">
                            <div className="lg:w-3/5">
                                <h3 className="text-base font-bold text-black pb-2">
                                    Sign-in Method
                                </h3>
                                <p className="text-gray-500 text-sm lg:text-xs">
                                    {signInMethods.map(provider => {
                                        return provider
                                    })}
                                </p>
                            </div>
                            <div className="lg:w-2/5">
                                <div className="float-right">
                                    <button name="change" onClick={handleChangeSignIn} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                                        Change
                                </button>
                                </div>
                            </div>
                        </div>

                        <hr className="border-b border-gray-400 opacity-25 py-0" />

                        <div className="flex flex-col lg:flex-row lg:flex-grow py-6">
                            <div className="lg:w-3/5">
                                <h3 className="text-base font-bold text-black pb-2">
                                    Deactivate account
                                </h3>
                                <p className="text-gray-500 text-sm lg:text-xs">
                                    This will remove and disable your account.
                                </p>
                            </div>
                            <div className="lg:w-2/5">
                                <div className="float-right">
                                    <button name="delete" onClick={handleDeleteAccount} className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded inline-flex items-center">
                                        Deactivate Account
                                </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticationView>
    )
}

export default Profile