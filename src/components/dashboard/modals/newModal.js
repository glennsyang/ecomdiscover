import React from "react"
import { useForm } from "react-hook-form"
import NewCategory from './newcategory'
import NewMarketplace from './newmarketplace'
import NewFAQ from './newfaq'
import NewCompany from '../../companyModal'
import EditCompany from './editcompany'
import EditReview from './editreview'

export default function NewModal(props) {
    const showModal = true
    const { tableName, rowProps } = props
    const { register, errors, setValue, handleSubmit } = useForm()
    // Close button
    const onClose = () => { props.onClose && props.onClose() }
    // Submit button
    const onSubmit = modalData => { props.onCreate({ ...rowProps, ...modalData }) }

    if (!props.show) { return null }
    return (
        <>
            {tableName === 'companies' ?
                <NewCompany
                    show={showModal}
                    onClose={onClose}
                    onCreate={onClose}
                />
                :
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto w-1/3 max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                                        <h3 className="lg:text-2xl text-lg font-semibold pr-2 md:pr-10">
                                            {rowProps ? 'Update' : 'New'} {tableName.toUpperCase()}
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
                                    {tableName === 'faq' ? <NewFAQ register={register} errors={errors} rowProps={rowProps} /> : ''}
                                    {tableName === 'review' ? <EditReview register={register} errors={errors} setValue={setValue} rowProps={rowProps} /> : ''}
                                    {tableName === 'company' ? <EditCompany register={register} errors={errors} setValue={setValue} rowProps={rowProps} /> : ''}
                                    {/*footer*/}
                                    <div className="flex items-center justify-end py-2 px-4 border-t border-solid border-gray-300 rounded-b">
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
                                            {rowProps ? 'Update' : 'Create'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            }
        </>
    )
}
