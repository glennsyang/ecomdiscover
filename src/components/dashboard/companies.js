import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import Loader from "../loader"

const RowDisplay = (props) => {
    const { name, blurb, website, created } = props.company
    return (
        <tr>
            <td className="border px-4 py-2">{name}</td>
            <td className="border px-4 py-2">{blurb}</td>
            <td className="border px-4 py-2">{website}</td>
            <td className="border px-4 py-2">{created}</td>
        </tr>
    )
}

const Companies = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('companies').onSnapshot(querySnapshot => {
            let allCompanies = []
            querySnapshot.forEach(doc => {
                const company = doc.data()
                company.id = doc.id
                company.created = `${moment.utc(company.created.toDate()).format("DD-MMM-YYYY hh:mm a")}`
                allCompanies.push(company)
            })

            setCompanies(allCompanies)
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
                            Companies
                    </div>
                        <div className="p-3 bg-white">
                            <table className="table-responsive w-full rounded">
                                <thead>
                                    <tr>
                                        <th className="border w-1/6 px-4 py-2">Name</th>
                                        <th className="border w-1/6 px-4 py-2">Blurb</th>
                                        <th className="border w-1/6 px-4 py-2">Website</th>
                                        <th className="border w-1/6 px-4 py-2">Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies && companies.map(company => {
                                        return (
                                            <RowDisplay key={company.id} company={company} />
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

export default Companies