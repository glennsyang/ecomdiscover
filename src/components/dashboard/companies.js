import React, { useState, useEffect, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"
//import EditableCell from "./editablecell"
import * as Constants from '../../constants'
import { hydrate } from "./helper"

const Categories = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (<>
        {values.map(category => {
            return (<span key={category.id} className="inline-block bg-gray-100 border border-gray-200 rounded-md px-2 text-xs font-semibold text-blue-500 tracking-tight mr-1">{category.name}</span>)
        })}
    </>)
}

const Companies = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [companies, setCompanies] = useState([])
    const [toast, setToast] = useState()
    const showToast = (toastProps) => { setToast(toastProps) }
    const [skipPageReset, setSkipPageReset] = useState(false)

    const updateData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        const id = companies[rowIndex].id
        const old = companies[rowIndex].name
        //console.log("data:", rowIndex, columnId, value, id)
        if (value !== old) {
            // Update name
            firebase.firestore().collection(Constants.DASHBOARD_TABLE_COMPANIES).doc(id)
                .update({ name: value })
                .then(() => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Success!',
                        description: `Company successfully updated.`,
                        color: 'green',
                    }
                    setToast(toastProps)
                })
                .catch(error => {
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Error',
                        description: `There was an error in updating the company '${value}'. Reason: ${error.code}.`,
                        color: 'red',
                    }
                    setToast(toastProps)
                })
        }
    }

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection(Constants.DASHBOARD_TABLE_COMPANIES).onSnapshot(querySnapshot => {
            let allCompanies = []
            querySnapshot.forEach(async doc => {
                const company = doc.data()
                company.id = doc.id
                company.created = company.created.toDate()
                company.reviews = company.reviews.length
                await hydrate(company, ['categories'])
                allCompanies.push(company)
            })
            setTimeout(() => {
                setCompanies(allCompanies)
                setIsLoading(false)
            }, 500)
        })
        return () => unsubscribe()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "",
                accessor: "logoURL",
                disableSortBy: true,
                // Cell method will provide the cell value; we pass it to render a custom component
                Cell: ({ cell: { value } }) => <img src={value} alt={value} className="h-16 w-16 object-contain" />
            },
            {
                Header: "Name",
                accessor: "name",
                //Cell: EditableCell,
            },
            {
                Header: "Blurb",
                accessor: "blurb",
                //Cell: EditableCell,
                className: "w-1/3"
            },
            {
                Header: "Categories",
                accessor: "categories",
                Cell: ({ cell: { value } }) => <Categories values={value} />
            },
            {
                Header: "Reviews",
                accessor: "reviews",
                sortType: 'basic'
            },
            {
                Header: "Website",
                accessor: "website",
            },
            {
                Header: "Created",
                accessor: "created",
                Cell: ({ cell: { value } }) => moment.utc(value).format("DD-MMM-YYYY hh:mm a"),
                sortType: 'datetime'
            },
            {
                Header: "Actions",
                disableSortBy: true,
                id: 'actions',
                accessor: 'actions',
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={Constants.DASHBOARD_TABLE_COMPANIES} component={'Companies'} onCloseToast={showToast} />)
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
                    data={companies}
                    tableName={'companies'}
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

export default Companies