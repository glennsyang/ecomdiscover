import React, { useState, useEffect, useMemo, useCallback } from "react"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"
import NewModal from "./modals/newModal"

const Faqs = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [faqs, setFaqs] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [rowProps, setRowProps] = useState()

    const [toast, setToast] = useState()
    const showToast = (toastProps) => { setToast(toastProps) }
    const [skipPageReset, setSkipPageReset] = useState(false)

    const createData = (modalData) => {
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
    // Modal
    const handleToggleModal = useCallback((rowProps) => {
        setRowProps(rowProps)
        setShowModal(s => !s)
        //setShowModal(!showModal)
    }, [])
    const handleEditModal = (modalData) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setIsLoading(true)
        setShowModal(!showModal)
        let dataObj = {}
        dataObj['question'] = modalData.question
        dataObj['answer'] = modalData.answer
        dataObj['date'] = firebase.firestore.FieldValue.serverTimestamp()
        // Update FAQ
        firebase.firestore().collection('faq').doc(modalData.id)
            .update(dataObj)
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
                    description: `There was an error in updating the FAQ. Reason: ${error.code}.`,
                    color: 'red',
                }
                setToast(toastProps)
            })
    }

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('faq').onSnapshot(querySnapshot => {
            let docs = querySnapshot.docs.map(doc => (
                { ...doc.data(), id: doc.id, date: doc.data().date ? doc.data().date.toDate() : new Date() }
            ))
            setFaqs(docs)
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
                Cell: ({ cell: { value } }) => moment(value).format("DD-MMM-YYYY hh:mm a"),
                sortType: 'datetime'
            },
            {
                Header: "Actions",
                disableSortBy: true,
                id: 'actions',
                accessor: 'actions',
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={'faq'} component={'FAQ'} onCloseToast={showToast} onEditRow={handleToggleModal} />)
            },
        ],
        [handleToggleModal]
    )

    if (isLoading) { return <Loader /> }

    return (
        <div className="flex flex-col">
            <Table
                columns={columns}
                data={faqs}
                tableName={'faq'}
                filterName={'question'}
                createData={createData}
                skipPageReset={skipPageReset}
            />
            <Toast
                toastProps={toast}
                position="bottom-right"
                autoDelete={true}
                autoDeleteTime={2500}
            />
            <NewModal
                show={showModal}
                tableName='faq'
                rowProps={rowProps}
                onClose={handleToggleModal}
                onCreate={handleEditModal}
            />
        </div>
    )
}

export default Faqs