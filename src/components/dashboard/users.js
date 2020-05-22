import React, { useMemo, useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import { FaPen, FaTimesCircle } from "react-icons/fa"
import moment from "moment"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import EditableCell from "./editablecell"

const Actions = (props) => {
    const { rowProps, component } = props
    const onClose = (toastProps) => { props.onClose && props.onClose(toastProps) }

    const handleDelete = (row) => {
        firebase.firestore().collection(component).doc(row.id).delete().then(() => {
            console.log("User successfully deleted!")
            const toastProps = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Success!',
                description: `User successfully deleted.`,
                color: 'green',
            }
            onClose(toastProps)
        }).catch((error) => {
            console.error("Error deleting user: ", error)
            const toastProps = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Error',
                description: `There was an error in deleting the account ${row.displayName}. Reason: ${error}.`,
                color: 'red',
            }
            onClose(toastProps)
        })
    }
    const handleEdit = (row) => {
        const toastProps = {
            id: Math.floor((Math.random() * 101) + 1),
            title: 'Warning',
            description: `Please click the cell for '${row.displayName}' to edit.`,
            color: 'yellow',
        }
        onClose(toastProps)
    }
    return (<>
        <button type="button" onClick={() => handleEdit(rowProps)} className="text-green-500"><FaPen size={16} /></button>
        <button type="button" onClick={() => handleDelete(rowProps)} className="text-red-500 ml-2"><FaTimesCircle size={16} /></button>
    </>)
}

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
                Cell: ({ row }) => (<Actions rowProps={row.original} component={"users"} onClose={showToast} />)
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