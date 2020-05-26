import React, { useMemo, useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"
import EditableCell from "./editablecell"
import * as Constants from '../../constants'

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
            firebase.firestore().collection(Constants.DASHBOARD_TABLE_USERS).doc(uid)
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
        const unsubscribe = firebase.firestore().collection(Constants.DASHBOARD_TABLE_USERS).onSnapshot(querySnapshot => {
            let allUsers = []
            querySnapshot.forEach(doc => {
                const user = doc.data()
                user.id = doc.id
                user.created = user.created.toDate()
                user.updated = user.updated.toDate()
                user.helpful = user.helpful.length
                allUsers.push(user)
            })
            setUsers(allUsers)
            setIsLoading(false)
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
                Header: "Liked",
                accessor: "helpful",
                sortType: 'basic'
            },
            {
                Header: "Role",
                accessor: "role"
            },
            {
                Header: "Created",
                accessor: "created",
                Cell: ({ cell: { value } }) => moment.utc(value).format("DD-MMM-YYYY hh:mm a"),
                sortType: 'datetime'
            },
            {
                Header: "Updated",
                accessor: "updated",
                Cell: ({ cell: { value } }) => moment.utc(value).format("DD-MMM-YYYY hh:mm a"),
                sortType: 'datetime'
            },
            {
                Header: "Actions",
                disableSortBy: true,
                id: 'actions',
                accessor: 'actions',
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={Constants.DASHBOARD_TABLE_USERS} component={'User'} onCloseToast={showToast} />)
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