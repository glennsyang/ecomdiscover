import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/page-header"

export default () => {

    const props = { title: "WRITE A REVIEW", subtitle: "Your first-hand experiences really help other businesses. Thanks!" }

    const [state, setstate] = useState(true)

    function handleChange(event) {
        setstate({ value: event.target.value })
    }

    function handleSubmit(event) {
        alert('An essay was submitted: ' + state.value)
        event.preventDefault()
    }

    return (
        <Layout>
            <SEO
                title="Review"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-40 py-8 border-2 border-blue-300">

                    <form onSubmit={handleSubmit}>
                        <label className="text-2xl font-bold text-black">
                            Title of your review:
                        </label>
                        <div>
                            <textarea className="text-md text-gray-600" value={state.value} onChange={handleChange} />
                        </div>

                        <button type="submit" className="mx-auto lg:mx-0 hover:underline bg-blue-500 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 text-white gradient">
                            Submit
                    </button>
                    </form>


                </div>
            </section>
        </Layout>
    )
}
