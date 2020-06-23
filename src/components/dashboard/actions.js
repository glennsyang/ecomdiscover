import React from "react"
import firebase from "gatsby-plugin-firebase"
import { FaPen, FaTimesCircle, FaPaperPlane, FaBan, FaEyeSlash, FaPlay } from "react-icons/fa"
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const Actions = (props) => {
    const { rowProps, collection, component } = props
    const onCloseToast = (toastProps) => { props.onCloseToast && props.onCloseToast(toastProps) }

    const handleDelete = (row) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="border border-gray-300 text-gray-600 antialiased shadow-lg rounded-lg p-10">
                        <h1 className="text-xl font-bold">Delete!</h1>
                        <p className="text-lg mt-4 mb-8">Are you sure you want to do this?</p>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2"
                            onClick={() => {
                                firebase.firestore().collection(collection).doc(row.id).delete().then(() => {
                                    const toastProps = {
                                        id: Math.floor((Math.random() * 101) + 1),
                                        title: 'Success!',
                                        description: `${component} successfully deleted.`,
                                        color: 'green',
                                    }
                                    onCloseToast(toastProps)
                                    onClose()
                                }).catch((error) => {
                                    const toastProps = {
                                        id: Math.floor((Math.random() * 101) + 1),
                                        title: 'Error',
                                        description: `There was an error in deleting the ${component}. Reason: ${error}.`,
                                        color: 'red',
                                    }
                                    onCloseToast(toastProps)
                                    onClose()
                                })
                            }}
                        >
                            Yes
                        </button>
                        <button onClick={onClose} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">No</button>
                    </div>
                )
            }
        })
    }
    const handleEdit = (row) => {
        //console.log("Edit Row:", row)
        const toastProps = {
            id: Math.floor((Math.random() * 101) + 1),
            title: 'Warning',
            description: `Please click the cell for this column to edit.`,
            color: 'yellow',
        }
        onCloseToast(toastProps)
    }
    const handleTogglePublish = (row) => {
        console.log("TogglePublish Review:", row)
        const newValue = row.published === 'Yes' ? false : true
        firebase.firestore().collection(collection).doc(row.id)
            .update({
                published: newValue,
                updated: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                console.log("Row:", row.companyId, row.id)
                // Add/Remove from 'reviews' array in company doc
                firebase.firestore().collection('companies').doc(row.companyId)
                    .update({
                        reviews: newValue
                            ? firebase.firestore.FieldValue.arrayUnion(firebase.firestore().collection('reviews').doc(row.id))
                            : firebase.firestore.FieldValue.arrayRemove(firebase.firestore().collection('reviews').doc(row.id)),
                        updated: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then(() => {
                        const toastProps = {
                            id: Math.floor((Math.random() * 101) + 1),
                            title: 'Success!',
                            description: `${component} will be ${newValue ? 'published' : 'removed'}.`,
                            color: 'green',
                        }
                        onCloseToast(toastProps)
                    })
                    .catch(error => {
                        const toastProps = {
                            id: Math.floor((Math.random() * 101) + 1),
                            title: 'Error',
                            description: `There was an error in updating the 'company' ${row.company}. Reason: ${error.code}.`,
                            color: 'red',
                        }
                        onCloseToast(toastProps)
                    })
            })
            .catch(error => {
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in updating the ${component}. Reason: ${error.code}.`,
                    color: 'red',
                }
                onCloseToast(toastProps)
            })
    }
    const handleToggleBlock = (row) => {
        console.log("ToggleBlock User:", row)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="border border-gray-300 text-gray-600 antialiased shadow-lg rounded-lg p-10">
                        <h1 className="text-xl font-bold">{`${row.active ? 'Block' : 'Re-Activate'} User!`}</h1>
                        <p className="text-lg mt-4 mb-8">Are you sure you want to do this?</p>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2"
                            onClick={() => {
                                firebase.firestore().collection(collection).doc(row.id)
                                    .update({
                                        active: !row.active,
                                        updated: firebase.firestore.FieldValue.serverTimestamp(),
                                    })
                                    .then(() => {
                                        const toastProps = {
                                            id: Math.floor((Math.random() * 101) + 1),
                                            title: 'Success!',
                                            description: `${component} is ${row.active ? 'blocked' : 'Re-Activated'}.`,
                                            color: 'green',
                                        }
                                        onCloseToast(toastProps)
                                        onClose()
                                    })
                                    .catch(error => {
                                        const toastProps = {
                                            id: Math.floor((Math.random() * 101) + 1),
                                            title: 'Error',
                                            description: `There was an error in updating the ${component}. Reason: ${error.code}.`,
                                            color: 'red',
                                        }
                                        onCloseToast(toastProps)
                                        onClose()
                                    })
                            }}
                        >
                            Yes
                            </button>
                        <button onClick={onClose} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">No</button>
                    </div>
                )
            }
        })
    }

    return (<>
        {component === 'Review' ?
            <button type="button" onClick={() => handleTogglePublish(rowProps)} className={rowProps.published === 'Yes' ? `text-black mr-2` : `text-blue-500 mr-2`}>
                {rowProps.published === 'Yes' ? <FaEyeSlash size={16} /> : <FaPaperPlane size={16} />}
            </button>
            : component === 'User' ?
                <button type="button" onClick={() => handleToggleBlock(rowProps)} className={rowProps.active ? `text-red-700 mr-2` : `text-blue-500 mr-2`}>
                    {rowProps.active ? <FaBan size={16} /> : <FaPlay size={16} />}
                </button>
                : ''}
        <button type="button" aria-label="Edit" onClick={() => handleEdit(rowProps)} className="text-green-500 mr-2"><FaPen size={16} /></button>
        <button type="button" aria-label="Delete" onClick={() => handleDelete(rowProps)} className="text-red-500"><FaTimesCircle size={16} /></button>
    </>)
}

export default Actions