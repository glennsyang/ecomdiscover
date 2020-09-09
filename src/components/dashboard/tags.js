import React, { useState, useEffect, useMemo, useCallback } from "react"
import firebase from "gatsby-plugin-firebase"
//import moment from "moment"
import Badge from "../dashboard/badge"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"
import NewModal from "./modals/newModal"

const Tags = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [tags, setTags] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [rowProps, setRowProps] = useState()

    const [toast, setToast] = useState()
    const showToast = (toastProps) => { setToast(toastProps) }
    const [skipPageReset, setSkipPageReset] = useState(false)

    const createData = (modalData) => {
        setSkipPageReset(true)
        setIsLoading(true)
        firebase.firestore().collection('tags')
            .add({
                tag: modalData.tag,
            })
            .then(ref => {
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Success!',
                    description: `Successfully added new Tag: ${modalData.tag}.`,
                    color: 'green',
                }
                setToast(toastProps)
            })
            .catch(error => {
                console.log("Error:", error)
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in creating new Tag: ${modalData.tag}. Reason: ${error}.`,
                    color: 'red',
                }
                setToast(toastProps)
            })
    }
    // Modal
    const handleToggleModal = useCallback((rowProps) => {
        setRowProps(rowProps)
        setShowModal(s => !s)
        //setShowModal(!showModal)
    }, [])
    const handleEditModal = (modalData) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setIsLoading(true)
        setShowModal(!showModal)
        let dataObj = {}
        dataObj['tag'] = modalData.tag
        // Update Tag
        firebase.firestore().collection('tags').doc(modalData.id)
            .update(dataObj)
            .then(() => {
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Success!',
                    description: `Tag successfully updated.`,
                    color: 'green',
                }
                setToast(toastProps)
            })
            .catch(error => {
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in updating the Tag. Reason: ${error.code}.`,
                    color: 'red',
                }
                setToast(toastProps)
            })
    }

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('tags').onSnapshot(querySnapshot => {
            let docs = querySnapshot.docs.map(doc => (
                { ...doc.data(), id: doc.id }
            ))
            console.log({ docs })
            setTags(docs)
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "Tag",
                accessor: "tag",
                Cell: ({ cell: { value } }) => <Badge values={value} />
            },
            {
                Header: "Actions",
                disableSortBy: true,
                id: 'actions',
                accessor: 'actions',
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={'tags'} component={'TAG'} onCloseToast={showToast} onEditRow={handleToggleModal} />)
            },
        ],
        [handleToggleModal]
    )

    if (isLoading) { return <Loader /> }

    return (
        <div className="flex flex-col">
            <Table
                columns={columns}
                data={tags}
                tableName={'tags'}
                filterName={'tag'}
                createData={createData}
                skipPageReset={skipPageReset}
            />
            <Toast
                toastProps={toast}
                position="bottom-right"
                autoDelete={true}
                autoDeleteTime={2500}
            />
            <NewModal
                show={showModal}
                tableName='tags'
                rowProps={rowProps}
                onClose={handleToggleModal}
                onCreate={handleEditModal}
            />
        </div>
    )
}

export default Tags