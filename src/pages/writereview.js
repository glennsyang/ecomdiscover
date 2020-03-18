import React from "react";
import { useForm, Controller } from "react-hook-form"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageFluid from "../components/image-fluid"
import ImageFixed from "../components/image-fixed"
import StarRating from "../components/star-rating"
import InputTag from "../components/inputtag"

// todo factor these into constants file
const ONE_DAY_MS = 24 * 3600 * 1000;

// returns a date like Fri Jun 14
function getMDY(ts) {
    return ts.toDateString().split(' ').slice(0, 3).join(' ')
}
// makeDate takes a TS and returns a date like Fri Jun 14
// if it's today or yesterday, it returns that instead
function currentDate() {
    const date = new Date();
    const dateStr = getMDY(date);
    const todayStr = getMDY(new Date());
    const yesterdayStr = getMDY(new Date(Date.now() - ONE_DAY_MS));
    if (dateStr === todayStr) {
        return 'today';
    } else if (dateStr === yesterdayStr) {
        return 'yesterday';
    } else {
        return dateStr;
    }
}

export default () => {

    const { register, errors, control, handleSubmit } = useForm()
    const onSubmit = data => {
        console.log("data is:", data)
    };
    console.log(errors && `errors: ${errors}`)

    const countriesSelected = [
        { id: 1, value: "USA", isChecked: false },
        { id: 2, value: "Canada", isChecked: false },
        { id: 3, value: "Other", isChecked: false }
    ]

    const imgProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `My Profile`,
        imgClass: "h-full w-full object-cover"
    };
    const imgAds = {
        imgName: "ads_digital_ocean.png",
        imgAlt: "Digital Ocean Ad",
        imgClass: ""
    };

    return (
        <Layout>
            <SEO
                title="Write Review"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="pt-4 bg-white">

                <div className="bg-gray-100 py-2">

                    <div className="container mx-auto px-18 flex items-center">

                        <div className="flex sm:w-2/3">
                            <Link title="User reviews" to={`/`} className="h-20 w-20 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                                <ImageFluid props={imgProfile} />
                            </Link>
                            <div className="mb-auto mt-auto">
                                <h3 className="text-md text-gray-600">
                                    <Link to={`/`} className="text-gray-600">By Doug Short</Link>
                                    <small className="text-gray-500"> • {currentDate()}</small>
                                </h3>
                            </div>
                        </div>
                        <div className="sm:w-1/3 mt-2 ml-2">
                            <a href="https://www.digitalocean.com" rel="noopener noreferrer" target="_blank">
                                <ImageFixed props={imgAds} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-18 py-4">
                    <div className="flex flex-col lg:flex-row">

                        <div className="lg:w-3/4">

                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className="block text-left text-black text-2xl font-bold">Title</div>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Summarize your review or highlight an interesting detail"
                                    ref={register({ required: { value: true, message: "This field is required." } })}
                                    className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2"
                                />
                                {errors.title && <span className="text-red-400 text-md">{errors?.title?.message}</span>}

                                <div className="block text-left text-black text-2xl font-bold mt-4">Review</div>
                                <textarea
                                    type="text"
                                    name="content"
                                    placeholder="By sharing your experiences you're helping businesses make better choices. Thank you!"
                                    ref={register({ required: { value: true, message: "This field is required." } })}
                                    className="text-black text-lg w-full block box-border rounded-md border border-gray-400 shadow-inner py-2 px-2 h-32"
                                />
                                {errors.content && <span className="text-red-400 text-md">{errors?.content?.message}</span>}

                                <div className="block text-left text-black text-2xl font-bold mt-4">Company</div>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Software, Tool or Service Name"
                                    ref={register({ required: { value: true, message: "This field is required." } })}
                                    className="text-black w-1/2 block box-border rounded-md border border-gray-400 shadow-inner py-2 px-2"
                                />
                                {errors.company && <span className="text-red-400 text-md">{errors?.company?.message}</span>}

                                <div className="block text-left text-black text-2xl font-bold mt-4">Website</div>
                                <input
                                    type="url"
                                    name="website"
                                    placeholder="www.example.com"
                                    ref={register({ required: { value: true, message: "This field is required." } })}
                                    className="text-black w-1/2 block box-border rounded-md border border-gray-400 shadow-inner py-2 px-2"
                                />
                                {errors.website && <span className="text-red-400 text-md">{errors?.website?.message}</span>}

                                <div className="block text-left text-black text-2xl font-bold mt-4">Categories</div>
                                <input
                                    type="text"
                                    name="categories"
                                    placeholder="Enter categories"
                                    ref={register({ required: true })}
                                    className="text-black w-1/2 block box-border rounded-md border border-gray-400 shadow-inner py-2 px-2"
                                />

                                <button
                                    type="submit"
                                    value="Submit"
                                    className="mx-auto lg:mx-0 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full my-6 py-4 px-8 shadow opacity-75 text-white gradient">
                                    Submit
                                </button>
                            </form>
                        </div>

                        <div className="w-1/4 pl-12">
                            <span className="block text-left text-black text-2xl font-bold mb-2">Rating</span>

                            <StarRating totalStars={5} name="rating" />

                            <div className="block text-left text-black text-2xl font-bold mt-8">Tags</div>

                            <Controller
                                name="tags"
                                as={<InputTag />}
                                control={control}
                                options={options}
                                defaultValue={[]}
                            />

                            <div className="block text-left text-black text-2xl font-bold mt-4">Marketplace</div>
                            <div className="flex-row justify-start text-black">
                                {countriesSelected.map((country) =>
                                    <React.Fragment key={country.id}>
                                        <input
                                            type="checkbox"
                                            name="marketplace"
                                            value={country.value}
                                            ref={register({ required: { value: true, message: "Please select at least one Marketplace." } })}
                                            className="m-2"
                                        />{country.value}
                                    </React.Fragment>
                                )}
                            </div>
                            {errors.marketplace && <span className="text-red-400 text-md">{errors?.marketplace?.message}</span>}

                        </div>
                    </div>
                </div>
            </section >
        </Layout >
    )
}