import React, { useState, useEffect, useRef } from "react"
import { Link, navigate } from "gatsby"
import { FaCheck, FaTimes, FaPen, FaThumbsUp, FaCamera } from 'react-icons/fa'
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import * as Constants from '../../constants'
import AuthenticationView from "./authenticationview"
import ImageFluid from "../image-fluid"
import Loader from "../loader"
import Toast from "../toast"
import { getUser, setUser } from "../../utils/auth"

function getFileNameFromUrl(urlString) {
    return urlString
        .substring(urlString
            .lastIndexOf("profile-images%2F") + ("profile-images%2F").length)
        .split('?')[0]
}

const Profile = () => {
    const user = getUser()
    const { uid, displayName, email, emailVerified, createdAt } = user
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
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [toast, setToast] = useState()
    const fileInput = useRef()

    useEffect(() => {
        const unsubscribeUser = firebase.firestore().collection('users').doc(uid).onSnapshot(snapshotUser => {
            //console.log("Helpful:", snapshotUser.data().helpful.length)
            const userDocRef = firebase.firestore().collection('users').doc(uid)
            firebase.firestore().collection('reviews').where("uid", "==", userDocRef).get().then(docs => {
                let writtenReviews = []
                docs.forEach(doc => {
                    writtenReviews.push(doc.data().id)
                })
                //console.log("Written:", writtenReviews.length)
                setUserInfo({
                    name: snapshotUser.data().displayName,
                    photo: snapshotUser.data().photoURL,
                    helpful: snapshotUser.data().helpful.length,
                    role: snapshotUser.data().role,
                    numReviews: writtenReviews.length,
                })
                setIsLoading(false)
            })
        })
        return () => unsubscribeUser()
    }, [uid])

    const handleSelectFile = (e) => {
        e.target.value = null
    }
    const handleUploadPhoto = (e) => {
        e.preventDefault()
        const fileData = fileInput.current.files[0]
        const fileName = fileInput.current.files[0].name
        const fileType = fileInput.current.files[0].type
        if (Constants.IMAGE_FILE_TYPES.lastIndexOf(fileType) === -1) {
            const toastProperties = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Error',
                description: `File ${fileName} is not a valid image.`,
                color: 'red',
            }
            setToast(toastProperties)
            return
        }
        if (fileData === '' || fileName === '') {
            console.log(`No file selected: ${typeof (fileData)}`)
            return
        }
        let reader = new FileReader()
        reader.readAsDataURL(fileData)
        reader.onload = () => {
            setIsLoading(true)
            const fileContent = reader.result
            const profileImageRef = firebase.storage().ref().child(`profile-images/${fileName}`)
            const uploadTask = profileImageRef.putString(fileContent, 'data_url')
            // Upload Task
            uploadTask.on('state_changed', (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(`Upload is '${progress}'% done`)
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused')
                        break
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running')
                        break
                    default:
                        break
                }
            }, (err) => {
                // Handle unsuccessful uploads
                setIsLoading(false)
                //console.log('File Upload error:', err.code)
                const toastProperties = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in uploading the file. Reason: ${err.code}.`,
                    color: 'red',
                }
                setToast(toastProperties)
            }, () => {
                // Handle successful uploads on complete
                const toastProperties = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Success!',
                    description: `Upload Complete.`,
                    color: 'green',
                }
                setToast(toastProperties)
                // Get URL of new photo
                uploadTask.snapshot.ref.getDownloadURL().then(firebaseUrl => {
                    // Get URL of old photo from 'users' collection, 'photoURL'
                    const oldPhoto = getFileNameFromUrl(userInfo.photo)
                    // Set in local state
                    setUserInfo({ ...userInfo, photo: firebaseUrl })
                    // Update 'users' collection (and 'user') with new photoURL
                    firebase.firestore().collection('users').doc(uid)
                        .update({ photoURL: firebaseUrl })
                        .then(() => {
                            setIsLoading(false)
                            // Delete old 'photoURL' image from storage bucket
                            const oldPhotoRef = firebase.storage().ref().child(`profile-images/${oldPhoto}`)
                            oldPhotoRef.delete().then(() => {
                                console.log("Old File deleted successfully:", oldPhoto)
                            }).catch((error) => {
                                console.log("Error in deleting old photo:", oldPhoto, error.code)
                                const toastProperties = {
                                    id: Math.floor((Math.random() * 101) + 1),
                                    title: 'Error',
                                    description: `There was an error in deleting your old profile photo. Reason: ${error.code}.`,
                                    color: 'red',
                                }
                                setToast(toastProperties)
                            })
                        })
                        .catch(error => {
                            setIsLoading(false)
                            console.log("Error:", error)
                            const toastProperties = {
                                id: Math.floor((Math.random() * 101) + 1),
                                title: 'Error',
                                description: `There was an error in updating your profile photo ${firebaseUrl}. Reason: ${error.code}.`,
                                color: 'red',
                            }
                            setToast(toastProperties)
                        })
                })
            })
        }
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
                                //photoURL: userInfo.photo
                            })
                            .then(() => {
                                setUser(currentUser)
                            })
                            .catch(error => {
                                console.log("Error:", error)
                                const toastProperties = {
                                    id: Math.floor((Math.random() * 101) + 1),
                                    title: 'Error',
                                    description: `There was an error in updating your profile. Reason: ${error.code}.`,
                                    color: 'red',
                                }
                                setToast(toastProperties)
                            })
                    }
                })
            })
            .catch(error => {
                console.log("Error:", error)
                const toastProperties = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in updating your profile. Reason: ${error.code}.`,
                    color: 'red',
                }
                setToast(toastProperties)
            })
    }
    const handleChangeSignIn = () => {
        const toastProperties = {
            id: Math.floor((Math.random() * 101) + 1),
            title: 'Warning',
            description: `Not available yet.`,
            color: 'yellow',
        }
        setToast(toastProperties)
    }
    const handleDeleteAccount = () => {
        const currentUser = firebase.auth().currentUser
        currentUser.delete().then(() => {
            setUser({})
            navigate('/app/login')
        }).catch(error => {
            console.log("Error:", error)
            const toastProperties = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Error',
                description: `There was an error in deactivating your account. Reason: ${error}.`,
                color: 'red',
            }
            setToast(toastProperties)
        })
    }

    return (
        <AuthenticationView title="Profile">
            {/* Card */}
            <div className="flex flex-col lg:flex-row lg:flex-grow shadow-xl rounded-lg border border-gray-100 p-10">
                {isLoading
                    ? <Loader />
                    : <div className="flex flex-col lg:flex-row lg:flex-grow">
                        {/* Avatar */}
                        <div className="lg:w-32 flex lg:flex-col flex-row items-center mr-6">
                            <div className="h-24 w-24 rounded-full overflow-hidden flex-shrink-0 relative">
                                {userInfo.photo
                                    ? <img src={userInfo.photo} alt={userInfo.name} className="h-full w-full object-cover" />
                                    : <ImageFluid props={imgBlankProfile} />
                                }
                            </div>
                            <div className="flex ml-4 lg:pt-4 lg:ml-0">
                                <label htmlFor="fileInput" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center cursor-pointer">
                                    <FaCamera size={18} className="mr-2" />
                                    <span>Upload</span>
                                    <input type="file" id="fileInput" aria-label="File input" className="hidden" ref={fileInput} onChange={handleUploadPhoto} onClick={handleSelectFile} />
                                </label>
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
                                            aria-label="Name"
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

                            <hr className="border-b border-gray-400 opacity-25 py-0" />

                            {userInfo.role === 'admin'
                                ? <div className="flex flex-col lg:flex-row lg:flex-grow py-6">
                                    <div className="lg:w-3/5">

                                    </div>
                                    <div className="lg:w-2/5">
                                        <div className="float-right">
                                            <Link to={`/dashboard/publishreviews`} className="bg-transparent hover:bg-green-500 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded inline-flex items-center">
                                                Dashboard
                                        </Link>
                                        </div>
                                    </div>
                                </div>
                                : ''
                            }
                        </div>
                    </div>
                }
                <Toast toastProps={toast} />
            </div>
        </AuthenticationView>
    )
}

export default Profile