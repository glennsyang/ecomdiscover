import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import Loader from "../loader"

const RowDisplay = (props) => {
    const { user, created, company, title, rating, tags, helpful } = props.review
    //console.log("display:", props.review)
    return (
        <tr>
            <td className="border px-4 py-2">{user}</td>
            <td className="border px-4 py-2">{created}</td>
            <td className="border px-4 py-2">{company}</td>
            <td className="border px-4 py-2">{title}</td>
            <td className="border px-4 py-2">{rating}</td>
            <td className="border px-4 py-2">{tags.join(', ')}</td>
            <td className="border px-4 py-2">{helpful}</td>
            <td className="border px-4 py-2">Yes</td>
        </tr>
    )
}

const PublishReviews = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('reviews').onSnapshot(querySnapshot => {
            let allReviews = []
            querySnapshot.forEach(doc => {
                const review = doc.data()
                review.id = doc.id
                review.user = doc.get("uid").id
                review.company = doc.get("company").id
                review.helpful = review.helpful.length
                review.created = `${moment.utc(review.created.toDate()).format("DD-MMM-YYYY hh:mm a")}`
                review.categories = ""
                allReviews.push(review)
            })
            //console.log("allReviews:", allReviews)
            setReviews(allReviews);
            setIsLoading(false);
        })
        return () => unsubscribe()
    }, [])

    return (
        <div className="flex flex-col">
            {isLoading
                ? <Loader />
                : <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 bg-white">
                    <div className="mb-2 border-solid border-gray-300 rounded shadow-lg w-full">
                        <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
                            Reviews
                    </div>
                        <div className="p-3 bg-white">
                            <table className="table-responsive w-full rounded bg-white">
                                <thead>
                                    <tr>
                                        <th className="border w-1/6 px-4 py-2">User</th>
                                        <th className="border w-1/6 px-4 py-2">Created</th>
                                        <th className="border w-1/6 px-4 py-2">Company</th>
                                        <th className="border w-1/6 px-4 py-2">Title</th>
                                        <th className="border w-1/6 px-4 py-2">Rating</th>
                                        <th className="border w-1/6 px-4 py-2">Tags</th>
                                        <th className="border w-1/6 px-4 py-2">Helpful</th>
                                        <th className="border w-1/12 px-4 py-2">Published</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews && reviews.map(review => {
                                        return (
                                            <RowDisplay key={review.id} review={review} />
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PublishReviews