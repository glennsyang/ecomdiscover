import React from "react"
import { useForm } from "react-hook-form"
import NewCategory from './newcategory'
import NewMarketplace from './newmarketplace'
import NewFAQ from './newfaq'

export default function CompanyModal(props) {
    const { tableName } = props
    const { register, errors, handleSubmit } = useForm()
    // Close button
    const onClose = () => { props.onClose && props.onClose() }
    // Submit button
    const onSubmit = modalData => { props.onCreate(modalData) }

    if (!props.show) { return null }
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto w-1/3 max-w-lg">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h3 className="lg:text-3xl text-xl font-semibold pr-2 md:pr-10">
                                    New {tableName.toUpperCase()}
                                </h3>
                                <button
                                    type="button"
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={onClose}>
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                </button>
                            </div>
                            {/*body*/}
                            {tableName === 'categories' ? <NewCategory register={register} errors={errors} /> : ''}
                            {tableName === 'marketplaces' ? <NewMarketplace register={register} errors={errors} /> : ''}
                            {tableName === 'faq' ? <NewFAQ register={register} errors={errors} /> : ''}
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="py-2 px-1 border-white border-b-2 font-bold text-blue hover:border-b-2 hover:border-blue-500 mx-4">
                                    Close
                                    </button>
                                <button
                                    type="submit"
                                    value="Submit"
                                    className="mx-auto lg:mx-0 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full py-4 px-8 shadow opacity-75 text-white gradient transition ease-in-out duration-700">
                                    Create
                                    </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}