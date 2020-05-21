import React, { useState, useEffect, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import Loader from "../loader"
import Table from "./table"

const Companies = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('companies').onSnapshot(querySnapshot => {
            let allCompanies = []
            querySnapshot.forEach(doc => {
                const company = doc.data()
                company.id = doc.id
                company.created = company.created.toDate()
                company.reviews = company.reviews.length
                allCompanies.push(company)
            })
            setCompanies(allCompanies)
            setIsLoading(false)
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
                accessor: "name"
            },
            {
                Header: "Blurb",
                accessor: "blurb"
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
        ],
        []
    )

    return (
        <div className="flex flex-col">
            {isLoading
                ? <Loader />
                : <Table columns={columns} data={companies} filterName={'name'} />
            }
        </div>
    )
}

export default Companies