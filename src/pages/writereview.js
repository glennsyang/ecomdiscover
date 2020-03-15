import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/page-header"

export default () => {

    const props = {
        title: "WRITE A REVIEW",
        subtitle: "Your first-hand experiences really help other businesses. Thanks!"
    }

    const { register, errors, handleSubmit } = useForm()
    const onSubmit = data => {
        console.log("this is:", data);
    };
    console.log("errors:", errors);

    return (
        <Layout>
            <SEO
                title="Write Review"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-40 py-6 border-2 border-blue-300">

                    <form onSubmit={handleSubmit(onSubmit)} >
                        <label htmlFor="title" className="block leading-loose text-left mt-5 mb-3 text-black text-2xl font-bold">Title of your review</label>
                        <input
                            type="text"
                            name="title"
                            ref={register({ required: true })}
                            className="text-black w-full block box-border rounded-md border border-white py-3 px-3 mb-3"
                        />
                        {errors.reviewTitle && <span className="text-red-400 text-lg ml-2">*This field is required</span>}

                        <label htmlFor="content" className="block leading-loose text-left mt-5 mb-3 text-black text-2xl font-bold">Review</label>
                        <textarea
                            name="content"
                            ref={register({ required: true })}
                            className="text-black w-full block box-border rounded-md border border-white py-3 px-3 mb-3 h-32"
                        />

                        <label htmlFor="rating" className="block leading-loose text-left mt-5 mb-3 text-black text-2xl font-bold">Rating</label>
                        <select name="rating" ref={register({ required: true })} className="text-black block box-border rounded-md border border-white py-3 px-3 mb-3">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <label htmlFor="company" className="block leading-loose text-left mt-5 mb-3 text-black text-2xl font-bold">Company</label>
                        <input
                            type="text"
                            name="company"
                            ref={register({ required: true })}
                            className="text-black w-1/2 block box-border rounded-md border border-white py-3 px-3 mb-3"
                        />
                        <label htmlFor="website" className="block leading-loose text-left mt-5 mb-3 text-black text-2xl font-bold">Website</label>
                        <input
                            type="text"
                            name="website"
                            ref={register({ required: true })}
                            className="text-black w-1/2 block box-border rounded-md border border-white py-3 px-3 mb-3"
                        />


                        <button
                            type="submit"
                            className="mx-auto lg:mx-0 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full mt-10 py-4 px-8 shadow opacity-75 text-white gradient">
                            Submit
                        </button>
                    </form>

                </div>
            </section>
        </Layout>
    )
}