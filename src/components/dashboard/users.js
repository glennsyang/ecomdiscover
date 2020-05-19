import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import Loader from "../loader"

const RowDisplay = (props) => {
    const { displayName, email, photoURL, role, created, updated } = props.user
    return (
        <tr>
            <td className="border px-4 py-2"><img src={photoURL} alt={displayName} className="h-12 w-12 object-cover rounded-full" /></td>
            <td className="border px-4 py-2">{displayName}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2">{role}</td>
            <td className="border px-4 py-2">{created}</td>
            <td className="border px-4 py-2">{updated}</td>
        </tr>
    )
}

const Users = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('users').onSnapshot(querySnapshot => {
            let allUsers = []
            querySnapshot.forEach(doc => {
                const user = doc.data()
                user.id = doc.id
                user.created = `${moment.utc(user.created.toDate()).format("DD-MMM-YYYY hh:mm a")}`
                user.updated = `${moment.utc(user.updated.toDate()).format("DD-MMM-YYYY hh:mm a")}`
                allUsers.push(user)
            })

            setUsers(allUsers)
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [])

    return (
        <div className="flex flex-col">
            {isLoading
                ? <Loader />
                : <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
                    <div className="mb-2 border-solid border-gray-300 rounded shadow-lg w-full">
                        <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
                            Users
                    </div>
                        <div className="p-3 bg-white">
                            <table className="table-responsive w-full rounded">
                                <thead>
                                    <tr>
                                        <th className="border w-1/6 px-4 py-2">Photo</th>
                                        <th className="border w-1/6 px-4 py-2">User</th>
                                        <th className="border w-1/6 px-4 py-2">Email</th>
                                        <th className="border w-1/6 px-4 py-2">Role</th>
                                        <th className="border w-1/6 px-4 py-2">Created</th>
                                        <th className="border w-1/6 px-4 py-2">Updated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.map(user => {
                                        return (
                                            <RowDisplay key={user.id} user={user} />
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

export default Users