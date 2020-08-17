import React, { useState, useEffect, useMemo, useCallback } from "react"
import firebase from "gatsby-plugin-firebase"
import { FaCaretRight, FaCaretDown } from "react-icons/fa"
import moment from "moment"
import Tags from "../dashboard/tags"
import Loader from "../loader"
import Toast from "../toast"
import Table from "./table"
import Actions from "./actions"
import NewModal from "./modals/newModal"
import { useBlogs } from "../../hooks/useBlogs"

const Blogs = () => {
    const { allMarkdownRemark } = useBlogs()
    const [isLoading, setIsLoading] = useState(true)
    const [blogs, setBlogs] = useState(allMarkdownRemark.nodes)

    const [showModal, setShowModal] = useState(false)
    const [rowProps, setRowProps] = useState()

    const [toast, setToast] = useState()
    const showToast = (toastProps) => { setToast(toastProps) }
    const [skipPageReset, setSkipPageReset] = useState(false)

    const createData = (modalData) => {
        setSkipPageReset(true)
        setIsLoading(true)
        firebase.firestore().collection('blog')
            .add({
                created: firebase.firestore.FieldValue.serverTimestamp(),
                updated: firebase.firestore.FieldValue.serverTimestamp(),
                title: modalData.title,
                subtitle: modalData.subtitle,
            })
            .then(ref => {
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Success!',
                    description: `Successfully added new Blog post: ${modalData.title}.`,
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
                    description: `There was an error in creating new Blog post: ${modalData.title}. Reason: ${error}.`,
                    color: 'red',
                }
                setToast(toastProps)
            })
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
        let dataObj = {}
        dataObj['title'] = modalData.title
        dataObj['subtitle'] = modalData.title
        dataObj['updated'] = firebase.firestore.FieldValue.serverTimestamp()
        // Update FAQ
        firebase.firestore().collection('blog').doc(modalData.id)
            .update(dataObj)
            .then(() => {
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Success!',
                    description: `Blog post successfully updated.`,
                    color: 'green',
                }
                setToast(toastProps)
            })
            .catch(error => {
                setIsLoading(false)
                const toastProps = {
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Error',
                    description: `There was an error in updating the Blog post. Reason: ${error.code}.`,
                    color: 'red',
                }
                setToast(toastProps)
            })
    }

    const columns = useMemo(
        () => [
            {
                Header: "Author",
                accessor: "frontmatter.author",
                //className: "w-1/4"
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
                Header: "Title",
                accessor: "frontmatter.title",
                //className: "w-1/4"
            },
            {
                Header: "Content",
                accessor: "html",
            },
            {
                Header: "SubTitle",
                accessor: "frontmatter.subtitle",
                className: "w-1/2"
            },
            {
                Header: "Tags",
                accessor: "frontmatter.tags",
                Cell: ({ cell: { value } }) => <Tags values={value} />
            },
            {
                Header: "Created",
                accessor: "frontmatter.date",
                Cell: ({ cell: { value } }) => moment(value).format("DD-MMM-YYYY hh:mm a"),
                //sortType: 'datetime'
            },
            {
                Header: "Actions",
                disableSortBy: true,
                id: 'actions',
                accessor: 'actions',
                Cell: ({ row }) => (<Actions rowProps={row.original} collection={'blog'} component={'BLOG'} onCloseToast={showToast} onEditRow={handleToggleModal} />)
            },
        ],
        [handleToggleModal]
    )

    // Create a function that will render our row sub components
    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <div
                className="text-gray-600 text-sm font-light antialiased p-2"
                dangerouslySetInnerHTML={{ __html: row.values.html }}
            />
        ),
        []
    )

    useEffect(() => {
        setBlogs(allMarkdownRemark.nodes)
        setIsLoading(false)
    }, [allMarkdownRemark.nodes])

    if (isLoading) { return <Loader /> }

    return (
        <div className="flex flex-col">
            <Table
                columns={columns}
                data={blogs}
                tableName={'blog'}
                filterName={'subtitle'}
                renderRowSubComponent={renderRowSubComponent}
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
                tableName='blog'
                rowProps={rowProps}
                onClose={handleToggleModal}
                onCreate={handleEditModal}
            />
        </div>
    )
}

export default Blogs