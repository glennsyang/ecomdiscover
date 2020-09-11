import React, { useState, useEffect, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"
import EditableCell from "./editablecell"

const Categories = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [toast, setToast] = useState()
    const showToast = (toastProps) => { setToast(toastProps) }
    const [skipPageReset, setSkipPageReset] = useState(false)

    const createData = (modalData) => {
        setSkipPageReset(true)
        setIsLoading(true)
        firebase.firestore().collection('categories')
            .add({ name: modalData.name, })
            .then(ref => {
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Success!',
                    description: `Successfully added new Category: ${modalData.name}.`,
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
                    description: `There was an error in creating new Category: ${modalData.name}. Reason: ${error}.`,
                    color: 'red',
                }
                setToast(toastProps)
            })
    }
    const updateData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        const id = categories[rowIndex].id
        const old = categories[rowIndex].name
        if (value !== old) {
            // Update name
            firebase.firestore().collection('categories').doc(id)
                .update({ name: value })
                .then(() => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Success!',
                        description: `Category successfully updated.`,
                        color: 'green',
                    }
                    setToast(toastProps)
                })
                .catch(error => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Error',
                        description: `There was an error in updating the category '${value}'. Reason: ${error.code}.`,
                        color: 'red',
                    }
                    setToast(toastProps)
                })
        }
    }

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('categories').onSnapshot(querySnapshot => {
            let docs = querySnapshot.docs.map(doc => (
                { ...doc.data(), id: doc.id }
            ))
            setCategories(docs)
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
                Cell: EditableCell,
            },
            {
                Header: "Actions",
                disableSortBy: true,
                id: 'actions',
                accessor: 'actions',
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={'categories'} component={'Category'} onCloseToast={showToast} />)
            },
        ],
        []
    )

    if (isLoading) { return <Loader /> }

    return (
        <div className="flex flex-col">
            <Table
                columns={columns}
                data={categories}
                tableName={'categories'}
                filterName={'name'}
                createData={createData}
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

export default Categories