import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import { FaThumbsUp } from 'react-icons/fa'
import moment from "moment"
import ImageFluid from "../image-fluid"
import Tag from "../tag"
import Toast from "../toast"
import AvgRating from "../avgrating"
import Loader from "../loader"
import { getUser, isLoggedIn } from "../../utils/auth"

const ReviewCard = ({ review }) => {
    const memberSince = review.user.created
    const createdAt = moment.utc(review.created, "YYYY-MM-DDTHH:mm:ss.SSSZ").local().format("DD MMMM, YYYY, h:mm a")
    const imgBlankProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `${review.user.username} Profile Photo`,
        imgClass: "h-full w-full object-cover"
    }
    // Get Live 'displayName', 'photoURL' and 'helpful' from firestore
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState(null)
    const [helpfulCount, setHelpfulCount] = useState(0)
    const [toast, setToast] = useState()
    useEffect(() => {
        // Get Helpful count for each review
        const unsubscribe = firebase.firestore().collection('reviews').doc(review.id).onSnapshot(snapshot => {
            setHelpfulCount(snapshot.data().helpful.length)
            // Get Info for each user
            firebase.firestore().collection('users').doc(review.user.id).get().then(doc => {
                setUserInfo({
                    name: doc.data().displayName,
                    photo: doc.data().photoURL,
                })
            }).catch(error => {
                const id = Math.floor((Math.random() * 101) + 1);
                const toastProperties = {
                    id,
                    title: 'Warning',
                    description: 'You are not signed in. Please sign-in for more details',
                    backgroundColor: '#d9534f',
                    className: 'bg-yellow-100 border-yellow-400 text-yellow-700'
                }
                setToast(toastProperties)
            })
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [review.id, review.user.id])

    // User functions
    const handleRateHelpful = () => {
        if (!isLoggedIn()) {
            const id = Math.floor((Math.random() * 101) + 1);
            const toastProperties = {
                id,
                title: 'Error',
                description: 'Please sign-in to rate helpful',
                backgroundColor: '#d9534f',
                className: 'bg-red-100 border-red-400 text-red-700'
            }
            setToast(toastProperties)

        } else {
            // get current logged-in user
            const { uid, displayName } = getUser()
            // update 'helpful' field in 'reviews' with current user id
            firebase.firestore().collection('reviews').doc(review.id)
                .update({
                    helpful: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().collection('users').doc(uid)),
                })
                .then(() => {
                    // update 'helpful' field in 'users' with current review id
                    firebase.firestore().collection('users').doc(uid)
                        .update({
                            helpful: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().collection('reviews').doc(review.id)),
                        })
                        .then(() => {
                            const id = Math.floor((Math.random() * 101) + 1);
                            const toastProperties = {
                                id,
                                title: 'Info',
                                description: `Thank you ${displayName} for your rating!`,
                                backgroundColor: '#d9534f',
                                className: 'bg-green-100 border-green-400 text-green-700'
                            }
                            setToast(toastProperties)
                        })
                        .catch(error => {
                            console.log("Error:", error)
                            const id = Math.floor((Math.random() * 101) + 1);
                            const toastProperties = {
                                id,
                                title: 'Error',
                                description: `Couldn't update user record. Reason: ${error}`,
                                backgroundColor: '#d9534f',
                                className: 'bg-red-100 border-red-400 text-red-700'
                            }
                            setToast(toastProperties)
                        })
                })
                .catch(error => {
                    console.log("Error:", error)
                    const id = Math.floor((Math.random() * 101) + 1);
                    const toastProperties = {
                        id,
                        title: 'Error',
                        description: `Couldn't update review record for ${review.title}. Reason: ${error}`,
                        backgroundColor: '#d9534f',
                        className: 'bg-red-100 border-red-400 text-red-700'
                    }
                    setToast(toastProperties)
                })
        }
    }

    return (
        <div className="rounded-lg shadow-xl border border-gray-200 bg-white p-10 mb-8">
            {isLoading
                ? <Loader />
                : <div className="flex flex-col lg:flex-row lg:flex-grow">
                    <div className="lg:w-32 flex">
                        <div className="h-20 w-20 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                            {userInfo && userInfo.photo
                                ? <img src={userInfo.photo} alt={`${userInfo.name} Profile`} className="h-full w-full object-cover" />
                                : <ImageFluid props={imgBlankProfile} />
                            }
                        </div>
                    </div>
                    <div className="lg:w-full flex flex-col">
                        <h3 className="flex text-base font-bold text-black">
                            {userInfo ? userInfo.name : review.user.username}
                        </h3>
                        <div className="flex pt-2 mb-4">
                            <span className="text-gray-400 text-sm lg:text-xs">{createdAt}</span>
                            <span className="text-gray-400 text-sm lg:text-xs pl-2">|</span>
                            <span className="text-gray-400 text-sm lg:text-xs pl-2">Member Since:</span>
                            <span className="text-gray-400 text-sm lg:text-xs pl-1">{memberSince}</span>
                        </div>
                        <div className="flex flex-col lg:flex-row flex-auto mb-4">
                            <div className="flex mb-4 lg:mb-0">
                                <AvgRating arrReviews={null} rating={review.rating} slug="" showAvgRating={false} showNumReviews={false} starSize="5" className="" />
                            </div>
                            <div className="flex lg:ml-6">
                                {/* Tags */}
                                <Tag tags={review.tags} />
                            </div>
                        </div>
                        {/* Title */}
                        <p className="text-black text-base font-bold mb-4">
                            {review.title}
                        </p>
                        <div className="text-base font-normal text-gray-800"
                            dangerouslySetInnerHTML={{ __html: review.content }}
                        />

                        <div className="bg-white">
                            <div className="float-right mt-12 lg:mr-6">
                                <button name="submit" onClick={handleRateHelpful} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                                    <FaThumbsUp size={18} className="mr-2" />
                                    <span className="tooltip">
                                        Helpful <span className="ml-1">{helpfulCount}</span> {!isLoggedIn()
                                            ? <span className='tooltip-text bg-black text-white text-xs p-3 -mt-8 -ml-16 rounded'>
                                                Please <Link to={`/app/login`} className="text-blue-500">sign-in</Link> to rate helpful.
                                        </span>
                                            : ''}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Toast
                toastProps={toast}
                position="bottom-right"
                autoDelete={true}
                autoDeleteTime={2500}
            />
        </div>
    )
}

export default ReviewCard