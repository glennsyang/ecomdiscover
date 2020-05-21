import React, { useState } from "react"
import { useTable, useFilters, useSortBy, usePagination } from "react-table"
import { FaSearch, FaCaretDown, FaCaretUp, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"

export default function Table({ columns, data, filterName }) {
    const [filterInput, setFilterInput] = useState("")
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        page, // rows for the table based on the data passed, which has only the rows for the active page
        rows,
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
        initialState: { pageIndex: 0 },
    },
        useFilters,
        useSortBy,
        usePagination
    )
    const handleFilterChange = e => {
        const value = e.target.value || undefined
        setFilter(filterName, value)
        setFilterInput(value)
    }

    // Render the UI for your table
    return (
        <>
            <div className="text-gray-600 bg-white mb-4 px-4 py-2 flex justify-between items-center">
                <div className="text-sm antialiased font-semibold">
                    Display
                    <select
                        className="outline-none mx-2 p-2"
                        value={pageSize}
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
                    results
                </div>
                <div className="flex flex-row items-center border p-2">
                    <FaSearch size={16} />
                    <input
                        value={filterInput}
                        onChange={handleFilterChange}
                        placeholder={"Search..."}
                        type='text'
                        className="px-4 outline-none text-sm antialiased font-light"
                    />
                </div>
            </div>
            <table className="rounded-md shadow-lg" {...getTableProps()}>
                <thead className="bg-blue-100">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="text-gray-600 text-sm font-semibold antialiased text-left p-2 sort-desc"
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
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td className="bg-white text-gray-600 text-sm antialiased font-light border-b p-2" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
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
        </>
    )
}