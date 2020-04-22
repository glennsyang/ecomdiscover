import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import AuthenticationView from "./authenticationview"
import ImageFluid from "../image-fluid"
import Loader from "../loader"
import { FaCheck, FaTimes, FaPen, FaThumbsUp, FaCamera } from 'react-icons/fa'
import { getUser, setUser } from "../../utils/auth"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"

const Profile = () => {
    const user = getUser()
    const { uid, displayName, email, emailVerified, photoURL, createdAt } = user
    const memberSince = moment(+createdAt).format("D MMMM YYYY")
    const signInMethods = user.providerData.map(profile => {
        if (profile.providerId === "password") {
            return "Email/Password"
        }
        return profile.providerId
    })
    const imgBlankProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `${displayName} Profile Photo`,
        imgClass: "h-full w-full object-cover"
    }
    const [userInfo, setUserInfo] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const unsubscribeUser = firebase.firestore().collection('users').doc(uid).onSnapshot(snapshotUser => {
            //console.log("Helpful:", snapshotUser.data().helpful.length)
            const userDocRef = firebase.firestore().collection('users').doc(uid)
            firebase.firestore().collection('reviews').where("uid", "==", userDocRef).get().then(docs => {
                let writtenReviews = []
                docs.forEach(doc => {
                    writtenReviews.push(doc.data().id);
                })
                //console.log("Written:", writtenReviews.length)
                setUserInfo({
                    name: snapshotUser.data().displayName,
                    photo: snapshotUser.data().photoURL,
                    helpful: snapshotUser.data().helpful.length,
                    numReviews: writtenReviews.length,
                })
            })
        })

        return () => {
            unsubscribeUser()
        }
    }, [uid])
    /*
    useEffect(() => {
        const gsRef = firebase.storage().refFromURL('gs://ecomdiscover.appspot.com/profile-images/sarah-fox.jpg');
        gsRef.getDownloadURL().then(url => {
            console.log("urlPhoto:", url)
            setUserInfo({ ...userInfo, photo: url })
        })
    }, [])
    */
    // Buttons
    const handleChangeProfilePhoto = (e) => {
        e.preventDefault()

        const fileData = e.target.value
        console.log("change profile photo:", fileData)
        const profileImageRef = firebase.storage().ref().child('profile-images/mountains.jpg')
        profileImageRef.put(fileData).then(snapshot => {
            console.log('Uploaded a blob or file!')
            snapshot.ref.getDownloadURL().then(downloadURL => {
                console.log('File available at', downloadURL)
            })
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        setUserInfo({ ...userInfo, name: e.target.value })
    }
    const handleEditProfile = () => {
        setIsEditing(true)
    }
    const handleSaveProfile = (e) => {
        e.preventDefault()
        setUserInfo({ ...userInfo, name: userInfo.name })
        setIsEditing(false)
        console.log("userPhoto:", userInfo.photo)
        firebase.firestore().collection('users').doc(uid)
            .update({
                displayName: userInfo.name,
                photoURL: userInfo.photo
            })
            .then(() => {
                user.displayName = userInfo.name
                setUser(user)
                firebase.auth().onAuthStateChanged(currentUser => {
                    if (currentUser) {
                        currentUser
                            .updateProfile({
                                displayName: userInfo.name,
                                photoURL: userInfo.photo
                            })
                            .then(() => {
                                setUser(currentUser)
                            })
                            .catch(error => {
                                console.log("Error:", error)
                                alert('An error occurred. Unable to update profile: ' + email)
                            })
                    }
                })
            })
            .catch(error => {
                console.log("Error:", error)
                alert('An error occurred. Unable to update user: ' + email)
            })
    }
    const handleChangeSignIn = () => {
        alert('Not Available')
    }
    const handleDeleteAccount = () => {
        const currentUser = firebase.auth().currentUser
        currentUser.delete().then(() => {
            setUser({});
            navigate('/app/login');
        }).catch(error => {
            console.log("Error:", error)
            alert('An error occured. Unable to deactivate account:' + email)
        })
    }

    return (
        <AuthenticationView title="Profile">
            {/* Card */}
            <div className="flex flex-col lg:flex-row lg:flex-grow shadow-xl rounded-lg border border-gray-100 p-10">
                {!userInfo
                    ? <Loader />
                    : <div className="flex flex-col lg:flex-row lg:flex-grow">
                        {/* Avatar */}
                        <div className="lg:w-32 flex flex-col">
                            <div className="h-20 w-20 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                                {photoURL
                                    ? <img src={userInfo.photo} alt={userInfo.name} className="h-full w-full object-cover" />
                                    : <ImageFluid props={imgBlankProfile} />
                                }
                            </div>
                            <div className="flex justify-center pt-4 mr-8">
                                <FaCamera onClick={handleChangeProfilePhoto} title="Change Profile Photo" className="text-gray-500 text-lg lg:text-base" />
                            </div>
                        </div>
                        {/* User Details */}
                        <div className="lg:w-full flex flex-col mt-4 md:mt-0 lg:mt-0">
                            <div className="flex flex-col lg:flex-row lg:flex-grow pb-4">
                                <div className="lg:w-3/5">
                                    {isEditing ?
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={userInfo.name}
                                            onChange={handleChange}
                                            //defaultValue={displayName}
                                            className="text-black w-full rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                        />
                                        :
                                        <h3 className="flex text-base font-bold text-black">
                                            {userInfo.name ?? '{displayName}'}
                                        </h3>
                                    }
                                    <div className="flex pt-2">
                                        <span className="text-gray-500 text-sm lg:text-xs">Member Since</span>
                                        <span className="text-gray-500 text-sm lg:text-xs pl-1">{memberSince}</span>
                                    </div>
                                    <div className="flex pt-2">
                                        <span className="text-gray-500 text-sm lg:text-xs">{`${email}`}</span>
                                        <span className="text-lg lg:text-base pl-3">{emailVerified ? <FaCheck title="Email Verified!" className="text-green-500" /> : <FaTimes title="Email Not Verified" className="text-red-500" />}</span>
                                    </div>
                                    <div className="flex pt-2">
                                        <span className="text-gray-500 text-sm lg:text-xs">{userInfo.numReviews}</span><FaPen className="text-gray-500 text-lg lg:text-base pl-1" title={`Wrote ${userInfo.numReviews} Reviews`} />
                                        <span className="text-gray-500 text-sm lg:text-xs ml-4">{userInfo.helpful}</span><FaThumbsUp className="text-gray-500 text-lg lg:text-base pl-1" title={`Liked ${userInfo.helpful} Reviews`} />
                                    </div>
                                </div>
                                <div className="lg:w-2/5">
                                    <div className="float-right">
                                        {isEditing ?
                                            <button name="save" onClick={handleSaveProfile} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                                                Save
                                        </button>
                                            :
                                            <button name="edit" onClick={handleEditProfile} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                                                Edit
                                        </button>
                                        }
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
                                            Deactivate
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <input accept=".jpg" type="file" name="profilePhoto" />
                        </div>
                    </div>}
            </div>
        </AuthenticationView>
    )
}

export default Profile