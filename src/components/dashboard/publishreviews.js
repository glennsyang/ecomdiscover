import React, { useState, useEffect, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import Loader from "../loader"
import Table from "./table"

const Tags = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
        <>
            {values.map((tag, idx) => {
                return (
                    <span key={idx} className="inline-block bg-gray-200 rounded-full px-2 text-xs font-semibold text-gray-700 mr-1">
                        {tag}
                    </span>
                );
            })}
        </>
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
                review.created = review.created.toDate()
                review.categories = review.categories.length
                review.published = 'Yes'
                allReviews.push(review)
            })
            setReviews(allReviews);
            setIsLoading(false);
        })
        return () => unsubscribe()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "User",
                accessor: "user"
            },
            {
                Header: "Created",
                accessor: "created",
                Cell: ({ cell: { value } }) => moment.utc(value).format("DD-MMM-YYYY hh:mm a"),
                sortType: 'datetime'
            },
            {
                Header: "Company",
                accessor: "company"
            },
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Tags",
                accessor: "tags",
                Cell: ({ cell: { value } }) => <Tags values={value} />
            },
            {
                Header: "Rating",
                accessor: "rating",
                sortType: 'basic'
            },
            {
                Header: "Liked",
                accessor: "helpful",
                sortType: 'basic'
            },
            {
                Header: "Published?",
                accessor: "published"
            }
        ],
        []
    )

    return (
        <div className="flex flex-col">
            {isLoading
                ? <Loader />
                : <Table columns={columns} data={reviews} filterName={'title'} />
            }
        </div>
    )
}

export default PublishReviews