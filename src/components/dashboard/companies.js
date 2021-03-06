import React, { useState, useEffect, useMemo, useCallback } from "react"
import firebase from "gatsby-plugin-firebase"
import { FaCaretRight, FaCaretDown } from "react-icons/fa"
import moment from "moment"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"
import NewModal from "./modals/newModal"
import { hydrate } from "./helper"

const Categories = ({ values }) => {
    if (values[0].category === 'undefined') { return null }
    return (<>
        {values?.map(category => {
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

    const [showModal, setShowModal] = useState(false)
    const [rowProps, setRowProps] = useState()

    const createData = (modalData) => {
        setSkipPageReset(true)
        setIsLoading(true)
    }
    const updateData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        const id = companies[rowIndex].id
        const oldValue = companies[rowIndex][columnId]
        if (value !== oldValue) {
            // Update db
            let dataObj = {}
            dataObj[columnId] = value
            dataObj['updated'] = firebase.firestore.FieldValue.serverTimestamp()
            firebase.firestore().collection('companies').doc(id)
                .update(dataObj)
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
    // Modal
    const handleToggleModal = useCallback((rowProps) => {
        setRowProps(rowProps)
        setShowModal(s => !s)
    }, [])
    const handleEditModal = (modalData) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setIsLoading(true)
        setShowModal(!showModal)
        // First, upload the logo to the Storage bucket, if exists
        if (modalData.selectedFile) {
            const storageRef = firebase.storage().ref().child(`company-images/${modalData.selectedFile.name}`)
            storageRef.put(modalData.selectedFile).on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
                console.log(percentage)
            }, (err) => {
                setIsLoading(false)
                const toastProperties = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in uploading the file. Reason: ${err}.`,
                    color: 'red',
                    position: 'top-right'
                }
                setToast(toastProperties)
            }, async () => {
                const companyLogoURL = await storageRef.getDownloadURL()
                modalData.logoURL = companyLogoURL
                updateCompanyInFirestore(modalData)
            })
        } else {
            updateCompanyInFirestore(modalData)
        }
    }
    // Update the Company in the Firestore db
    const updateCompanyInFirestore = (modalData) => {
        // Create the data object to be updated
        let dataObj = {}
        dataObj['blurb'] = modalData.blurb
        dataObj['content'] = modalData.content
        dataObj['name'] = modalData.name
        dataObj['categories'] = modalData.categories.map((category) => (
            firebase.firestore().doc(`categories/${category.value}`)
        ))
        dataObj['logoURL'] = modalData.logoURL
        dataObj['marketplaces'] = modalData.marketplaces.map((marketplace) => (
            firebase.firestore().doc(`marketplaces/${marketplace}`)
        ))
        dataObj['website'] = modalData.website
        dataObj['updated'] = firebase.firestore.FieldValue.serverTimestamp()
        // Update Company
        firebase.firestore().collection('companies').doc(modalData.id)
            .update(dataObj)
            .then(() => {
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Success!',
                    description: `Company successfully updated.`,
                    color: 'green',
                }
                setToast(toastProps)
            })
            .catch(error => {
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in updating the Company. Reason: ${error.code}.`,
                    color: 'red',
                }
                setToast(toastProps)
            })
    }

    useEffect(() => {
        let allCompanies = []
        const unsubscribe = firebase.firestore().collection('companies').onSnapshot(querySnapshot => {
            querySnapshot.forEach(async doc => {
                const company = doc.data()
                company.id = doc.id
                await hydrate(company, ['uid', 'categories'])
                company.created = company.created ? company.created.toDate() : new Date()
                company.updated = company.updated ? company.updated.toDate() : new Date()
                company.reviews = company.reviews.length
                company.user = company.uid.displayName
                allCompanies.push(company)
            })
            setTimeout(() => {
                setCompanies(allCompanies)
                setIsLoading(false)
            }, 2000)
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
                Cell: ({ cell: { value } }) => <img src={value} alt={value} className="h-12 w-12 object-contain" />
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: () => null, // No header
                id: 'expander', // It needs an ID
                className: "max-w-xs",
                Cell: ({ row }) => (
                    // Use Cell to render an expander for each row.
                    // We can use the getToggleRowExpandedProps prop-getter
                    // to build the expander.
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? <FaCaretDown /> : <FaCaretRight />}
                    </span>
                ),
            },
            {
                Header: "Blurb",
                accessor: "blurb",
                className: "min-w-full"
            },
            {
                Header: "Description",
                accessor: "content",
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
            // {
            //     Header: "Created",
            //     accessor: "created",
            //     Cell: ({ cell: { value } }) => moment(value).format("DD-MMM-YYYY hh:mm a"),
            //     sortType: 'datetime'
            // },
            {
                Header: "Who?",
                accessor: "user",
            },
            {
                Header: "Updated",
                accessor: "updated",
                Cell: ({ cell: { value } }) => moment(value).format("DD-MMM-YYYY hh:mm a"),
                sortType: 'datetime'
            },
            {
                Header: "Actions",
                disableSortBy: true,
                id: 'actions',
                accessor: 'actions',
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={'companies'} component={'Companies'} onCloseToast={showToast} onEditRow={handleToggleModal} />)
            },
        ],
        [handleToggleModal]
    )

    // Create a function that will render our row sub components
    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <div className="text-gray-600 text-sm font-light antialiased p-2"
                dangerouslySetInnerHTML={{ __html: row.values.content }} />
        ),
        []
    )

    if (isLoading) { return <Loader /> }

    return (
        <div className="flex flex-col">
            <Table
                columns={columns}
                data={companies}
                tableName={'companies'}
                renderRowSubComponent={renderRowSubComponent}
                filterName={'name'}
                createData={createData}
                updateData={updateData}
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
                tableName='company'
                rowProps={rowProps}
                onClose={handleToggleModal}
                onCreate={handleEditModal}
            />
        </div>
    )
}

export default Companies