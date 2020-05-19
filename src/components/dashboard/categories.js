import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import Loader from "../loader"

const RowDisplay = (props) => {
    const { id, name } = props.category
    return (
        <tr>
            <td className="border px-4 py-2">{id}</td>
            <td className="border px-4 py-2">{name}</td>
        </tr>
    )
}

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

    return (
        <div className="flex flex-col">
            {isLoading
                ? <Loader />
                : <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
                    <div className="mb-2 border-solid border-gray-300 rounded shadow-lg w-full">
                        <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
                            Categories
                    </div>
                        <div className="p-3 bg-white">
                            <table className="table-responsive w-full rounded">
                                <thead>
                                    <tr>
                                        <th className="border w-1/6 px-4 py-2">Id</th>
                                        <th className="border w-1/6 px-4 py-2">Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories && categories.map(category => {
                                        return (
                                            <RowDisplay key={category.id} category={category} />
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Categories