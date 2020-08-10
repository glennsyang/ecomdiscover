import React, { useState } from "react"
import { useTable, useFilters, useSortBy, usePagination, useExpanded } from "react-table"
import { FaSearch, FaCaretDown, FaCaretUp, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaPlus } from "react-icons/fa"
import NewModal from "./modals/newModal"

export default function Table({ columns, data, renderRowSubComponent, tableName, filterName, createData, updateData, skipPageReset }) {
    const [filterInput, setFilterInput] = useState("")
    const [filterPublish, setFilterPublish] = useState()
    const [showModal, setShowModal] = useState(false)
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        page, // rows for the table based on the data passed, which has only the rows for the active page
        rows,
        visibleColumns,
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        //pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        setFilter
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, hiddenColumns: ['content', 'description'] },
        createData,
        updateData,
        autoResetPage: !skipPageReset,
    },
        useFilters,
        useSortBy,
        useExpanded,
        usePagination
    )

    const handleFilterChange = e => {
        const value = e.target.value || undefined
        setFilter(filterName, value)
        setFilterInput(value)
    }
    const handleFilterPublish = e => {
        const value = e.target.value || undefined
        setFilter('published', value)
        setFilterPublish(value)
    }
    // Modal
    const handleToggleModal = () => { setShowModal(!showModal) }
    const handleCreateModal = (modalData) => {
        setShowModal(!showModal)
        createData(modalData)
    }

    // Render the UI for your table
    return (
        <>
            <div className="text-gray-600 bg-white mb-4 px-4 py-2 flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <div className="text-sm antialiased font-semibold">
                        Display
                    <select
                            className="outline-none appearance-none mx-2 py-2 px-4 bg-gray-200"
                            value={pageSize}
                            aria-label="Select Page Size"
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    {filterName === 'title' ?
                        <div className="text-sm antialiased font-semibold ml-3">
                            Published
                            <select
                                className="outline-none appearance-none mx-2 py-2 px-4 bg-gray-200"
                                value={filterPublish}
                                aria-label="Select Published or not"
                                onChange={e => {
                                    handleFilterPublish(e)
                                }}
                            >
                                <option value="">All</option>
                                {['Yes', 'No'].map((option, i) => (
                                    <option key={i} value={option}>
                                        {option}
                                    </ option>
                                ))}
                            </select>
                        </div>
                        : ''}
                </div>
                <div className="flex justify-between items-center">
                    {tableName === 'faq' || tableName === 'marketplaces' || tableName === 'categories' || tableName === 'companies' ?
                        <button
                            type="button"
                            title="Add New"
                            onClick={handleToggleModal}
                            className="text-gray-600 p-2 mr-4">
                            <FaPlus size={24} />
                        </button>
                        : ''}
                    <div className="flex flex-row items-center border p-2">
                        <FaSearch size={16} />
                        <input
                            value={filterInput}
                            onChange={handleFilterChange}
                            placeholder={"Search..."}
                            aria-label="Search a column"
                            type='text'
                            className="px-4 outline-none text-sm antialiased font-light"
                        />
                    </div>
                </div>
            </div>
            <table className="rounded-md shadow-lg" {...getTableProps()}>
                <thead className="bg-blue-100">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={`${column.className} text-gray-600 text-sm font-semibold antialiased text-left p-2`}
                                >
                                    <span className="inline-block">{column.render("Header")}</span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? <FaCaretDown size={16} className="inline-block ml-2" />
                                            : <FaCaretUp size={16} className="inline-block ml-2" />
                                        : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            // Use a React.Fragment here so the table markup is still valid
                            <React.Fragment key={i}>
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td className={`${cell.column.className} bg-white text-gray-600 text-sm antialiased font-light border-b p-2`}
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                                {row.isExpanded ? (
                                    <tr>
                                        <td colSpan={visibleColumns.length}>
                                            {renderRowSubComponent({ row })}
                                        </td>
                                    </tr>
                                ) : null}
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
            {/* 
                Pagination can be built however you'd like. 
                This is just a very basic UI implementation:
            */}
            <div className="flex justify-between items-center mx-2 my-4">
                <span className="text-gray-600 text-sm antialiased font-semibold p-2">
                    Page{' '}<span>{pageIndex + 1} of {pageCount}</span>
                </span>
                <span className="text-gray-600 text-sm antialiased font-semibold p-2">{'Total:'}{' '}{rows.length}</span>
                <div className="text-gray-600 bg-blue-100 rounded-lg border text-sm antialiased font-semibold">
                    <button type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="p-2 border-r">
                        <FaAngleDoubleLeft size={18} />
                    </button>
                    <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage} className="p-2 border-r">
                        <FaChevronLeft size={18} />
                    </button>
                    <button type="button" onClick={() => nextPage()} disabled={!canNextPage} className="p-2 border-r">
                        <FaChevronRight size={18} />
                    </button>
                    <button type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="p-2">
                        <FaAngleDoubleRight size={18} />
                    </button>
                </div>
            </div>
            <NewModal
                show={showModal}
                tableName={tableName}
                onClose={handleToggleModal}
                onCreate={handleCreateModal}
            />
        </>
    )
}
