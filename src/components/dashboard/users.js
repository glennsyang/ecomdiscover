import React, { useMemo, useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import { FaCheck, FaBan } from "react-icons/fa"
import moment from "moment"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"
import EditableCell from "./editablecell"

const Users = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [toast, setToast] = useState()
    const showToast = (toastProps) => { setToast(toastProps) }
    const [skipPageReset, setSkipPageReset] = useState(false)

    const updateData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        const uid = users[rowIndex].id
        const old = users[rowIndex].displayName
        if (value !== old) {
            // Update displayName
            firebase.firestore().collection('users').doc(uid)
                .update({ displayName: value })
                .then(() => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Success!',
                        description: `User successfully updated.`,
                        color: 'green',
                    }
                    setToast(toastProps)
                })
                .catch(error => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Error',
                        description: `There was an error in updating the user '${value}'. Reason: ${error.code}.`,
                        color: 'red',
                    }
                    setToast(toastProps)
                })
        }
    }

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('users').onSnapshot(querySnapshot => {
            let allUsers = []
            querySnapshot.forEach(async doc => {
                const user = doc.data()
                user.id = doc.id
                user.created = user.created.toDate()
                user.updated = user.updated ? user.updated.toDate() : new Date()
                user.helpful = user.helpful.length

                const userDocRef = firebase.firestore().collection('users').doc(doc.id)
                const reviewDocs = await firebase.firestore().collection('reviews').where("uid", "==", userDocRef).get()
                let writtenReviews = []
                reviewDocs.forEach(reviewDoc => {
                    writtenReviews.push(reviewDoc.data().id)
                })
                user.numReviews = writtenReviews.length

                allUsers.push(user)
            })
            //setUsers(allUsers)
            //setIsLoading(false)
            setTimeout(() => {
                setUsers(allUsers)
                setIsLoading(false)
            }, 500)
        })
        setSkipPageReset(false)
        return () => unsubscribe()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "",
                accessor: "photoURL",
                disableSortBy: true,
                // Cell method will provide the cell value; we pass it to render a custom component
                Cell: ({ cell: { value } }) => <img src={value} alt={value} className="h-12 w-12 object-cover rounded-full" />
            },
            {
                Header: "Name",
                accessor: "displayName",
                Cell: EditableCell,
            },
            {
                Header: "Email",
                accessor: "email"
            },
            {
                Header: "Reviews",
                accessor: "numReviews",
            },
            {
                Header: "Liked",
                accessor: "helpful",
                sortType: 'basic'
            },
            {
                Header: "Role",
                accessor: "role"
            },
            {
                Header: "Active",
                accessor: "active",
                Cell: ({ cell: { value } }) => value === true
                    ? <FaCheck size={16} className="text-green-500" />
                    : <FaBan size={16} className="text-red-500" />,
                sortType: 'basic'
            },
            {
                Header: "Created",
                accessor: "created",
                Cell: ({ cell: { value } }) => moment(value).format("DD-MMM-YYYY hh:mm a"),
                sortType: 'datetime'
            },
            {
                Header: "Updated",
                accessor: "updated",
                Cell: ({ cell: { value } }) => moment(value).format("DD-MMM-YYYY hh:mm a"),
                sortType: 'datetime'
            },
            {
                Header: "Actions",
                disableSortBy: true,
                id: 'actions',
                accessor: 'actions',
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={'users'} component={'User'} onCloseToast={showToast} />)
                //accessor: (str) => 'delete',
                // Cell: ({ row }) => (
                //     <div>
                //         <button onClick={() => handleDelete(row.original)}>Delete</button>
                //     </div>
                // )
            },
        ],
        []
    )

    return (
        <div className="flex flex-col">
            {isLoading
                ? <Loader />
                : <Table
                    columns={columns}
                    data={users}
                    tableName={'users'}
                    filterName={'displayName'}
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

export default Users