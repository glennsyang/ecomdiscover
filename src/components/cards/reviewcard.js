import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import ImageFluid from "../image-fluid"
import Tag from "../tag"
import AvgRating from "../avgrating"
import { isLoggedIn } from "../../utils/auth"
import { FaThumbsUp } from 'react-icons/fa'
import firebase from "gatsby-plugin-firebase"
import { getUser } from "../../utils/auth"

const ReviewCard = ({ review }) => {
    const memberSince = review.user.created
    //const helpfulCount = review.helpful.length
    // Get Live helpfulCount from firestore
    const [helpfulCount, setHelpfulCount] = useState(0)
    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('reviews').doc(review.id).onSnapshot(snapshot => {
            setHelpfulCount(snapshot.data().helpful.length)
        })

        return () => unsubscribe();
    }, [review.id])

    const imgProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `${review.user.username} Profile`,
        imgClass: "h-full w-full object-cover"
    }
    // User functions
    const handleRateHelpful = (e) => {
        //e.preventDefault()
        // get current logged-in user
        const { uid } = getUser()
        // update 'helpful' field in 'reviews' with current user id
        firebase.firestore().collection('reviews').doc(review.id)
            .update({
                helpful: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().collection('users').doc(uid)),
            })
            .then(() => {
                //alert('Success! Update review: ' + review.title)
                // update 'helpful' field in 'users' with current review id
                firebase.firestore().collection('users').doc(uid)
                    .update({
                        helpful: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().collection('reviews').doc(review.id)),
                    })
                    .then(() => {
                        //alert('Success! Update user: ' + uid)
                    })
                    .catch(error => {
                        console.log("Error:", error)
                        alert('An error occurred. Unable to update user: ' + uid + '. Reason: ' + error)
                    })
            })
            .catch(error => {
                console.log("Error:", error)
                alert('An error occurred. Unable to update review: ' + review.id + '. Reason: ' + error)
            })
    }

    return (
        <div className="rounded-lg shadow-xl border border-gray-200 bg-white p-10 mb-8">

            <div className="flex flex-col lg:flex-row lg:flex-grow">
                {/* Avatar */}
                <div className="lg:w-32 flex">
                    <div className="h-20 w-20 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                        {review.user.photoURL
                            ? <img src={review.user.photoURL} alt={`${review.user.username} Profile`} className="h-full w-full object-cover" />
                            : <ImageFluid props={imgProfile} />
                        }
                    </div>
                </div>
                {/* User Details & Review Content */}
                <div className="lg:w-full flex flex-col">
                    <h3 className="flex text-base font-bold text-black">
                        {review.user.username}
                    </h3>
                    <div className="flex pt-2 mb-4">
                        <span className="text-gray-400 text-sm lg:text-xs">{review.created}</span>
                        <span className="text-gray-400 text-sm lg:text-xs pl-2">|</span>
                        <span className="text-gray-400 text-sm lg:text-xs pl-2">Member Since:</span>
                        <span className="text-gray-400 text-sm lg:text-xs pl-1">{memberSince}</span>
                    </div>
                    <div className="flex flex-col lg:flex-row flex-auto mb-4">
                        {/* Rating */}
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
                    <div
                        className="text-base font-normal text-gray-800"
                        dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                    <div className="bg-white">
                        <div className="float-right mt-12 lg:mr-6">
                            <button name="submit" onClick={handleRateHelpful} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                                <FaThumbsUp size={18} className="mr-2" />
                                <span className="tooltip">
                                    Helpful <span className="ml-1">{helpfulCount}</span> {!isLoggedIn()
                                        ? <span className='tooltip-text bg-black text-white text-xs p-3 -mt-8 -ml-16 rounded'>
                                            Please <Link to={`/app/signup`} className="text-blue-500">sign-in</Link> to rate helpful.
                                        </span>
                                        : ''}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ReviewCard