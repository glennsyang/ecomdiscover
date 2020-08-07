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
        const id = users[rowIndex].id
        const oldValue = users[rowIndex][columnId]
        if (value !== oldValue) {
            // Update db
            let dataObj = {}
            dataObj[columnId] = value
            dataObj['updated'] = firebase.firestore.FieldValue.serverTimestamp()
            firebase.firestore().collection('users').doc(id)
                .update(dataObj)
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
        async function fetchData() {
            const unsubscribe = firebase.firestore().collection('users').onSnapshot(querySnapshot => {
                let docs = querySnapshot.docs.map(doc => (
                    {
                        ...doc.data(),
                        id: doc.id,
                        created: doc.data().created.toDate(),
                        updated: doc.data().updated ? doc.data().updated.toDate() : new Date(),
                        helpful: doc.data().helpful.length,
                        numReviews: doc.data().reviews.length
                    }
                ))
                setUsers(docs)
                setIsLoading(false)
                setSkipPageReset(false)
            })
            return () => unsubscribe()
        }
        fetchData()
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
                Header: "Helpful",
                accessor: "helpful",
                sortType: 'basic'
            },
            {
                Header: "Role",
                accessor: "role",
                Cell: EditableCell,
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

    if (isLoading) { return <Loader /> }

    return (
        <div className="flex flex-col">
            <Table
                columns={columns}
                data={users}
                tableName={'users'}
                filterName={'displayName'}
                updateData={updateData}
                skipPageReset={skipPageReset}
            />
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