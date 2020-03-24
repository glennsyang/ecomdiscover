import React, { useEffect, useState } from "react"
import { Link, graphql, navigate } from "gatsby"
import { useForm } from "react-hook-form"
import Select from 'react-select'
import firebase from "gatsby-plugin-firebase"

import * as Constants from '../constants'
import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageFluid from "../components/image-fluid"
import ImageFixed from "../components/image-fixed"
import StarRating from "../components/star-rating"
import InputTag from "../components/inputtag"

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
    const yesterdayStr = getMDY(new Date(Date.now() - Constants.ONE_DAY_MS));
    if (dateStr === todayStr) {
        return 'today';
    } else if (dateStr === yesterdayStr) {
        return 'yesterday';
    } else {
        return dateStr;
    }
}
const customStyles = {
    control: styles => ({
        ...styles,
        backgroundColor: 'white',
        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        padding: '1px',
        borderColor: '#cbd5e0'
    }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px gray',
        backgroundColor: state.isSelected ? 'white' : 'white',
        color: '#2d3748',
        ':hover': {
            backgroundColor: '#f7fafc',
            color: '#4299e1',
        },
        padding: 10,
        fontSize: '14px',
    }),
    singleValue: ((provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }),
    placeholder: styles => ({ ...styles, color: '#cbd5e0' }),
}

export default ({ data }) => {
    const { register, errors, handleSubmit, setValue } = useForm()
    const onSubmit = formData => {
        formData = Object.assign(formData, {
            rating: Number(formData.rating),
            logo: 'logo_sellics.png',
            username: "Glenn Sheppard",
            created: firebase.firestore.FieldValue.serverTimestamp(),
            categories: formData.categories.map((category) => (
                firebase.firestore().doc(`categories/${category.value}`)
            ))
        })
        navigate(
            "/form-submitted",
            {
                state: { username: formData.username, company: formData.company },
                replace: true,
            }
        )
        // firebase
        //     .firestore()
        //     .collection('reviews')
        //     .doc()
        //     .set(formData)
        //     .then(() => {
        //         console.log("sent to firestore!")
        //         reset({
        //             rating: 0,
        //             tags: [],
        //             marketplace: countriesSelected
        //         });
        //         setValue('categories', [])
        //     })
    }
    console.log(errors && `errors: ${errors}, rating: ${errors.rating}`)

    const categories = data.allCategories.edges.map(({ node }) => (
        { value: node.id, label: node.name }
    ))
    const [values, setCategories] = useState({
        selectedOption: [],
    })
    const handleMultiChange = selectedOption => {
        setValue('categories', selectedOption)
        setCategories({ selectedOption })
    }
    useEffect(() => {
        register({ name: 'categories' })
    })

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

                        <div className="lg:w-4/6">

                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className="block text-left text-black text-2xl font-bold">Title</div>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Summarize your review or highlight an interesting detail"
                                    ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                    className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                />
                                {errors.title && <span className="text-red-400 text-md">{errors?.title?.message}</span>}

                                <div className="block text-left text-black text-2xl font-bold mt-4">Review</div>
                                <textarea
                                    type="text"
                                    name="content"
                                    placeholder="By sharing your experiences you're helping businesses make better choices. Thank you!"
                                    ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                    className="text-black text-lg w-full block box-border rounded-md border border-gray-400 shadow-inner py-2 px-2 h-32 placeholder-gray-400"
                                />
                                {errors.content && <span className="text-red-400 text-md">{errors?.content?.message}</span>}

                                <div className="flex">
                                    <div className="w-3/5">
                                        <div className="block text-left text-black text-2xl font-bold mt-4">Company</div>
                                        <input
                                            type="text"
                                            name="company"
                                            placeholder="Software, Tool or Service Name"
                                            ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                            className="block text-black w-full box-border rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                        />
                                        {errors.company && <span className="text-red-400 text-md">{errors?.company?.message}</span>}
                                    </div>

                                    <div className="w-2/5 ml-4">
                                        <div className="block text-left text-black text-2xl font-bold mt-4">Website</div>
                                        <input
                                            type="url"
                                            name="website"
                                            placeholder="example.com"
                                            ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                            className="block text-black w-full box-border rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                        />
                                        {errors.website && <span className="text-red-400 text-md">{errors?.website?.message}</span>}
                                    </div>
                                </div>

                                <div className="block text-left text-black text-2xl font-bold mt-4">Categories</div>
                                <Select
                                    styles={customStyles}
                                    name="categories"
                                    placeholder="Select Categories"
                                    value={values.selectedOption}
                                    options={categories}
                                    onChange={handleMultiChange}
                                    isMulti
                                />

                                <button
                                    type="submit"
                                    value="Submit"
                                    className="mx-auto lg:mx-0 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full my-6 py-4 px-8 shadow opacity-75 text-white gradient">
                                    Submit
                                </button>
                            </form>
                        </div>

                        <div className="w-2/6 pl-12">
                            <span className="block text-left text-black text-2xl font-bold mb-2">Rating</span>

                            <StarRating totalStars={5} name="rating" register={register} rules={{ required: true, message: Constants.SELECT_MARKETPLACE }} />
                            {errors.rating && <span className="text-red-400 text-md">{errors?.rating?.message}</span>}

                            <div className="block text-black text-2xl font-bold mt-8">Tags</div>

                            <InputTag name="tags" label="Tags" register={register} />

                            <div className="block text-left text-black text-2xl font-bold mt-4">Marketplace</div>
                            <div className="flex-row justify-start text-black">
                                {countriesSelected.map((country) =>
                                    <React.Fragment key={country.id}>
                                        <input
                                            type="checkbox"
                                            name="marketplace"
                                            value={country.value}
                                            ref={register({ required: { value: true, message: Constants.SELECT_MARKETPLACE } })}
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

export const query = graphql`
query {
    allCategories (sort: { fields: name, order: ASC }) {
    edges {
      node {
        id
        name
      }
    }
  }
}
`