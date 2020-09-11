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
        // lookup flag & name for 3-letter country code to REST API
        const { code } = modalData
        fetch(`https://restcountries.eu/rest/v2/alpha/${code.toLowerCase()}?fields=flag;name;alpha3Code`)
            .then(res => res.json())
            .then(data => {
                firebase.firestore().collection('marketplaces').doc(code)
                    .set({
                        code: code,
                        flag: data.flag,
                        name: data.name,
                    })
                    .then(ref => {
                        setIsLoading(false)
                        const toastProps = {
                            id: Math.floor((Math.random() * 101) + 1),
                            title: 'Success!',
                            description: `Successfully added new Marketplace: ${code} - ${data.name}.`,
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
                            description: `There was an error in creating new Marketplace: ${code}. Reason: ${error}.`,
                            color: 'red',
                        }
                        setToast(toastProps)
                    })
            })
            .catch(error => {
                console.log("Error:", error)
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in retrieving Country information for: ${code}. Reason: ${error}.`,
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
            let docs = querySnapshot.docs.map(doc => (
                { ...doc.data(), id: doc.id }
            ))
            setMarketplaces(docs)
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

    if (isLoading) { return <Loader /> }

    return (
        <div className="flex flex-col">
            <Table
                columns={columns}
                data={marketplaces}
                tableName={'marketplaces'}
                filterName={'name'}
                updateData={updateData}
                createData={createData}
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

export default Marketplaces