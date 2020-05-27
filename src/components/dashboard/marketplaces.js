import React, { useState, useEffect, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"

const Marketplaces = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [marketplaces, setMarketplaces] = useState([])
    const [toast, setToast] = useState()
    const showToast = (toastProps) => { setToast(toastProps) }
    const [skipPageReset, setSkipPageReset] = useState(false)

    const createData = (modalData) => {
        setSkipPageReset(true)
        setIsLoading(true)
        firebase.firestore().collection('marketplaces').doc(modalData.code)
            .set({
                code: modalData.code,
                flag: modalData.flag,
                name: modalData.name,
            })
            .then(ref => {
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Success!',
                    description: `Successfully added new Marketplace: ${modalData.name}.`,
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
                    description: `There was an error in creating new Marketplace: ${modalData.name}. Reason: ${error}.`,
                    color: 'red',
                }
                setToast(toastProps)
            })
    }
    const updateData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        const id = marketplaces[rowIndex].id
        const old = marketplaces[rowIndex].name
        if (value !== old) {
            // Update name
            firebase.firestore().collection('marketplaces').doc(id)
                .update({ name: value })
                .then(() => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Success!',
                        description: `Marketplace successfully updated.`,
                        color: 'green',
                    }
                    setToast(toastProps)
                })
                .catch(error => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Error',
                        description: `There was an error in updating the marketplace '${value}'. Reason: ${error.code}.`,
                        color: 'red',
                    }
                    setToast(toastProps)
                })
        }
    }

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('marketplaces').onSnapshot(querySnapshot => {
            let allMarketplaces = []
            querySnapshot.forEach(doc => {
                const category = doc.data()
                category.id = doc.id
                allMarketplaces.push(category)
            })
            setMarketplaces(allMarketplaces)
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "Code",
                accessor: "code",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Flag",
                accessor: "flag",
                disableSortBy: true,
                Cell: ({ cell: { value } }) => <img src={value} alt={value} className="h-4" />
            },
            {
                Header: "Actions",
                disableSortBy: true,
                id: 'actions',
                accessor: 'actions',
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={'marketplaces'} component={'Marketplace'} onCloseToast={showToast} />)
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
                    data={marketplaces}
                    tableName={'marketplaces'}
                    filterName={'name'}
                    updateData={updateData}
                    createData={createData}
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

export default Marketplaces