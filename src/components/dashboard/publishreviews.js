import React, { useState, useEffect, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import { FaCaretRight, FaCaretDown, FaCheck, FaTimes } from "react-icons/fa"
import moment from "moment"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"
//import EditableCell from "./editablecell"
import { hydrate } from "./helper"

const Tags = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (<>
        {values.map((tag, idx) => {
            return (<span key={idx} className="inline-block bg-gray-200 rounded-full px-2 text-xs font-semibold text-gray-700 mr-1">{tag}</span>)
        })}
    </>)
}

const PublishReviews = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    const [toast, setToast] = useState()
    const showToast = (toastProps) => { setToast(toastProps) }
    const [skipPageReset, setSkipPageReset] = useState(false)

    const updateData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        const id = reviews[rowIndex].id
        const old = reviews[rowIndex].title
        if (value !== old) {
            // Update name
            firebase.firestore().collection('reviews').doc(id)
                .update({ title: value })
                .then(() => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Success!',
                        description: `Review successfully updated.`,
                        color: 'green',
                    }
                    setToast(toastProps)
                })
                .catch(error => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Error',
                        description: `There was an error in updating the review '${value}'. Reason: ${error.code}.`,
                        color: 'red',
                    }
                    setToast(toastProps)
                })
        }
    }

    // const getReview = async docId => {
    //     return firebase.firestore()
    //         .collection('reviews')
    //         .doc(docId)
    //         .get()
    //         .then(async documentSnapshot => {
    //             const data = documentSnapshot.data()
    //             data.id = documentSnapshot.id
    //             await hydrate(data, ['uid', 'company'])
    //             return data
    //         })
    // }

    useEffect(() => {
        let allReviews = []
        firebase.firestore().collection('reviews').get().then(async querySnapshot => {
            querySnapshot.forEach(async documentSnapshot => {
                const data = documentSnapshot.data()
                data.id = documentSnapshot.id
                await hydrate(data, ['uid', 'company'])
                const review = {}
                review.id = data.id
                review.user = data.uid.displayName
                review.company = data.company ? data.company.name : 'company'
                review.helpful = data.helpful.length
                review.created = data.created.toDate()
                review.categories = data.categories.length
                review.tags = data.tags
                review.rating = data.rating
                review.title = data.title
                review.content = data.content
                review.published = data.published ? 'Yes' : 'No'
                allReviews.push(review)
            })
            setTimeout(() => {
                setReviews(allReviews)
                setIsLoading(false)
            }, 500)
        })
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "User",
                accessor: "user"
            },
            {
                Header: "Company",
                accessor: "company"
            },
            {
                Header: () => null, // No header
                id: 'expander', // It needs an ID
                className: "max-w-xs",
                Cell: ({ row }) => (
                    // Use Cell to render an expander for each row.
                    // We can use the getToggleRowExpandedProps prop-getter
                    // to build the expander.
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? <FaCaretDown /> : <FaCaretRight />}
                    </span>
                ),
            },
            {
                Header: "Title",
                accessor: "title",
                //Cell: EditableCell,
                className: "min-w-full"
            },
            {
                Header: "Content",
                accessor: "content",
            },
            {
                Header: "Rating",
                accessor: "rating",
                sortType: 'basic'
            },
            {
                Header: "Tags",
                accessor: "tags",
                Cell: ({ cell: { value } }) => <Tags values={value} />
            },
            {
                Header: "Liked",
                accessor: "helpful",
                sortType: 'basic'
            },
            {
                Header: "Created",
                accessor: "created",
                Cell: ({ cell: { value } }) => moment(value).format("DD-MMM-YYYY hh:mm a"),
                sortType: 'datetime'
            },
            {
                Header: "Published?",
                accessor: "published",
                Cell: ({ cell: { value } }) => value === 'Yes'
                    ? <FaCheck size={16} className="text-green-500" />
                    : <FaTimes size={16} className="text-red-500" />,
                sortType: 'basic'

            },
            {
                Header: "Actions",
                disableSortBy: true,
                id: 'actions',
                accessor: 'actions',
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={'reviews'} component={'Review'} onCloseToast={showToast} />)
            },
        ],
        []
    )

    // Create a function that will render our row sub components
    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <div
                className="text-gray-600 text-sm font-light antialiased p-2"
                dangerouslySetInnerHTML={{ __html: row.values.content }}
            />
        ),
        []
    )

    return (
        <div className="flex flex-col">
            {isLoading
                ? <Loader />
                : <Table
                    columns={columns}
                    data={reviews}
                    tableName={'reviews'}
                    renderRowSubComponent={renderRowSubComponent}
                    filterName={'title'}
                    updateData={updateData}
                    skipPageReset={skipPageReset}
                />
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

export default PublishReviews