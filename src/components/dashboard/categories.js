import React, { useState, useEffect, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"
import EditableCell from "./editablecell"
import * as Constants from '../../constants'

const Categories = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [toast, setToast] = useState()
    const showToast = (toastProps) => { setToast(toastProps) }
    const [skipPageReset, setSkipPageReset] = useState(false)

    const updateData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        const id = categories[rowIndex].id
        const old = categories[rowIndex].name
        if (value !== old) {
            // Update name
            firebase.firestore().collection(Constants.DASHBOARD_TABLE_CATEGORIES).doc(id)
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
        const unsubscribe = firebase.firestore().collection(Constants.DASHBOARD_TABLE_CATEGORIES).onSnapshot(querySnapshot => {
            let allCategories = []
            querySnapshot.forEach(doc => {
                const category = doc.data()
                category.id = doc.id
                allCategories.push(category)
            })
            setCategories(allCategories)
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
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={Constants.DASHBOARD_TABLE_CATEGORIES} component={'Category'} onCloseToast={showToast} />)
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
                    data={categories}
                    filterName={'name'}
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

export default Categories