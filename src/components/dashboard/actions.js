import React from "react"
import firebase from "gatsby-plugin-firebase"
import { FaPen, FaTimesCircle, FaPaperPlane, FaBan, FaEyeSlash } from "react-icons/fa"
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
    const handlePublish = (row) => {
        console.log("Publish Row:", row)
        if (row.published === 'Yes') {
            const toastProps = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Warning!',
                description: `Already Published to Live site.`,
                color: 'yellow',
            }
            onCloseToast(toastProps)
        } else {
            firebase.firestore().collection(collection).doc(row.id)
                .update({ published: true })
                .then(() => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Success!',
                        description: `${component} will be published.`,
                        color: 'green',
                    }
                    onCloseToast(toastProps)
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
    }
    const handleUnPublish = (row) => {
        console.log("UnPublish Row:", row)
        if (row.published === 'No') {
            const toastProps = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Warning!',
                description: `Already Un-Published from Live site.`,
                color: 'yellow',
            }
            onCloseToast(toastProps)
        } else {
            firebase.firestore().collection(collection).doc(row.id)
                .update({ published: false })
                .then(() => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Success!',
                        description: `${component} will be un-published.`,
                        color: 'green',
                    }
                    onCloseToast(toastProps)
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
    }
    const handleBlockUser = (row) => {
        console.log("Block User Row:", row)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="border border-gray-300 text-gray-600 antialiased shadow-lg rounded-lg p-10">
                        <h1 className="text-xl font-bold">Block User!</h1>
                        <p className="text-lg mt-4 mb-8">Are you sure you want to do this?</p>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2"
                            onClick={() => {
                                firebase.firestore().collection(collection).doc(row.id)
                                    .update({
                                        active: false,
                                        updated: firebase.firestore.FieldValue.serverTimestamp(),
                                    })
                                    .then(() => {
                                        const toastProps = {
                                            id: Math.floor((Math.random() * 101) + 1),
                                            title: 'Success!',
                                            description: `${component} will be blocked.`,
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
            <>
                <button type="button" title="Unpublish" onClick={() => handleUnPublish(rowProps)} className="text-black mr-2">
                    <FaEyeSlash size={16} />
                </button>
                <button type="button" title="Publish" onClick={() => handlePublish(rowProps)} className="text-blue-500 mr-2">
                    <FaPaperPlane size={16} />
                </button>
            </>
            : component === 'User' ?
                <button type="button" title="Block" onClick={() => handleBlockUser(rowProps)} className="text-red-700 mr-2">
                    <FaBan size={16} />
                </button>
                : ''}
        <button type="button" onClick={() => handleEdit(rowProps)} className="text-green-500 mr-2"><FaPen size={16} /></button>
        <button type="button" onClick={() => handleDelete(rowProps)} className="text-red-500"><FaTimesCircle size={16} /></button>
    </>)
}

export default Actions