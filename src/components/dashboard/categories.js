import React, { useState, useEffect, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import Loader from "../loader"
import Table from "./table"

const Categories = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('categories').onSnapshot(querySnapshot => {
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
                Header: "Id",
                accessor: "id"
            },
            {
                Header: "Name",
                accessor: "name"
            },
        ],
        []
    )

    return (
        <div className="flex flex-col">
            {isLoading
                ? <Loader />
                : <Table columns={columns} data={categories} filterName={'name'} />
            }
        </div>
    )
}

export default Categories