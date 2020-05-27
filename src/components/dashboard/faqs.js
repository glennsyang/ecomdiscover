import React, { useState, useEffect, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"
//import EditableCell from "./editablecell"

const Faqs = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [faqs, setFaqs] = useState([])
    const [toast, setToast] = useState()
    const showToast = (toastProps) => { setToast(toastProps) }
    const [skipPageReset, setSkipPageReset] = useState(false)

    const createData = (modalData) => {
        console.log("modalData:", modalData)
        setSkipPageReset(true)
        setIsLoading(true)
        firebase.firestore().collection('faq')
            .add({
                date: firebase.firestore.FieldValue.serverTimestamp(),
                question: modalData.question,
                answer: modalData.answer,
            })
            .then(ref => {
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Success!',
                    description: `Successfully added new FAQ: ${modalData.question}.`,
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
                    description: `There was an error in creating new FAQ: ${modalData.question}. Reason: ${error}.`,
                    color: 'red',
                }
                setToast(toastProps)
            })
    }
    const updateData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setIsLoading(true)
        const id = faqs[rowIndex].id
        const old = faqs[rowIndex].answer
        if (value !== old) {
            // Update name
            firebase.firestore().collection('faq').doc(id)
                .update({ answer: value })
                .then(() => {
                    setIsLoading(false)
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Success!',
                        description: `FAQ successfully updated.`,
                        color: 'green',
                    }
                    setToast(toastProps)
                })
                .catch(error => {
                    setIsLoading(false)
                    const toastProps = {
                        id: Math.floor((Math.random() * 101) + 1),
                        title: 'Error',
                        description: `There was an error in updating the faq '${value}'. Reason: ${error.code}.`,
                        color: 'red',
                    }
                    setToast(toastProps)
                })
        }
    }

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('faq').onSnapshot(querySnapshot => {
            let allFaqs = []
            querySnapshot.forEach(doc => {
                const faq = doc.data()
                faq.id = doc.id
                faq.date = faq.date ? faq.date.toDate() : new Date()
                allFaqs.push(faq)
            })
            setFaqs(allFaqs)
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "Question",
                accessor: "question",
                className: "w-1/4"
            },
            {
                Header: "Answer",
                accessor: "answer",
                className: "w-1/2"
            },
            {
                Header: "Date",
                accessor: "date",
                Cell: ({ cell: { value } }) => moment.utc(value).format("DD-MMM-YYYY hh:mm a"),
                sortType: 'datetime'
            },
            {
                Header: "Actions",
                disableSortBy: true,
                id: 'actions',
                accessor: 'actions',
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={'faq'} component={'FAQ'} onCloseToast={showToast} />)
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
                    data={faqs}
                    tableName={'faq'}
                    filterName={'question'}
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

export default Faqs