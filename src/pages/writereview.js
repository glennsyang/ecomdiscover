import React, { useEffect, useState } from "react"
import { Link, graphql, navigate } from "gatsby"
import { useForm } from "react-hook-form"
import Select from "react-select"
import CreatableSelect from 'react-select/creatable';
import firebase from "gatsby-plugin-firebase"

import * as Constants from '../constants'
import Layout from '../components/layout'
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

const createOption = (label) => (
    { value: label, label: label, website: '' }
)

export default function WriteReview({ data }) {
    const { register, errors, handleSubmit, setValue } = useForm()
    const onSubmit = formData => {
        console.log("data:", formData)
        // check if entered new company
        if (formData.company.value === formData.company.label) {
            firebase
                .firestore()
                .collection('companies')
                .add({ name: formData.company.label, logo: '', website: formData.website })
                .then(ref => {
                    updateFirestore(formData, ref.id)
                })
        } else {
            updateFirestore(formData, formData.company.value)
        }
    }

    const updateFirestore = (dataObject, companyId) => {
        delete dataObject.website
        dataObject = Object.assign(dataObject, {
            rating: dataObject.rating ? Number(dataObject.rating) : 0,
            username: "Glenn Sheppard",
            created: firebase.firestore.FieldValue.serverTimestamp(),
            company: firebase.firestore().doc(`companies/${companyId}`),
            categories: dataObject.categories.map((category) => (
                firebase.firestore().doc(`categories/${category.value}`)
            ))
        })
        firebase
            .firestore()
            .collection('reviews')
            .add(dataObject)
            .then(ref => {
                console.log("sent to firestore:", ref.id)
            })
        navigate(
            "/form-submitted",
            {
                state: { username: dataObject.username },
                replace: true,
            }
        )
    }
    //console.log("errors:", errors)

    // Companies
    const defaultCompanies = data.allCompanies.edges.map(({ node }) => (
        { value: node.id, label: node.name, website: node.website }
    ))
    const [options, setOptions] = useState(defaultCompanies)
    const [companies, setCompanies] = useState();
    const handleChange = selectedValue => {
        setValue('company', selectedValue)
        setValue('website', selectedValue ? selectedValue.website : "")
        setCompanies(selectedValue);
    }
    const handleCreate = newValue => {
        // add the new Company to existing list
        const newOption = createOption(newValue)
        setOptions([...options, newOption])
        setValue('company', newOption)
        setCompanies(newOption);
    }
    // Categories
    const categories = data.allCategories.edges.map(({ node }) => (
        { value: node.id, label: node.name }
    ))
    const [values, setCategories] = useState({ selectedOption: [] })
    const handleMultiChange = selectedOption => {
        setValue('categories', selectedOption)
        setCategories({ selectedOption })
    }

    useEffect(() => {
        register({ name: "company" })
        register({ name: "categories" })
        //register({ name: "rating" }, { required: true });
    }, [register])

    const imgProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `My Profile`,
        imgClass: "h-full w-full object-cover"
    };
    const imgAds = {
        imgName: "ads_digital_ocean.png",
        imgAlt: "Digital Ocean Ad",
        imgClass: "h-8 w-8 object-cover"
    };

    return (
        <Layout>
            <SEO
                title="Write Review"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="pt-4 flex flex-col flex-grow overflow-hidden bg-white">

                <div className="flex bg-gray-100 min-h-40 mb-4 py-6">

                    <div className="container mx-auto px-10 flex flex-col lg:flex-row items-center">

                        <div className="lg:flex lg:w-2/3">
                            <Link title="User reviews" to={`/`} className="h-20 w-20 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                                <ImageFluid props={imgProfile} />
                            </Link>
                            <div className="flex flex-col leading-tight">
                                <h3 className="text-md text-gray-600">
                                    <Link to={`/`} className="text-gray-600">By Doug Short</Link>
                                    <small className="text-gray-500"> • {currentDate()}</small>
                                </h3>
                            </div>
                        </div>
                        {/* Ads */}
                        <div className="lg:flex lg:w-1/3 overflow-hidden relative">
                            <a href="https://www.digitalocean.com" rel="noopener noreferrer" target="_blank">
                                <ImageFixed props={imgAds} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-10 pb-2">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="flex flex-col lg:flex-row mb-2">
                            <div className="lg:w-4/6">


                                <div className="block text-left text-black lg:text-2xl text-xl font-bold">Title</div>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Summarize your review or highlight an interesting detail"
                                    ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                    className="text-black w-full block rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                                />
                                {errors.title && <span className="text-red-400 text-md">{errors?.title?.message}</span>}

                                <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-4">Review</div>
                                <textarea
                                    type="text"
                                    name="content"
                                    placeholder="By sharing your experiences you're helping businesses make better choices. Thank you!"
                                    ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                    className="text-black text-lg w-full block box-border rounded-md border border-gray-400 shadow-inner py-2 px-2 h-32 placeholder-gray-400"
                                />
                                {errors.content && <span className="text-red-400 text-md">{errors?.content?.message}</span>}

                                <div className="lg:flex flex-row">
                                    <div className="lg:w-3/5">
                                        <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-4">Tool or Service Name</div>
                                        <CreatableSelect
                                            name="company"
                                            placeholder="Select Company..."
                                            value={companies}
                                            options={options}
                                            styles={customStyles}
                                            onChange={handleChange}
                                            onCreateOption={handleCreate}
                                            ref={() =>
                                                register(
                                                    { name: "company" },
                                                    {
                                                        validate: value => {
                                                            // need to validate if it is undefined or empty array
                                                            return Array.isArray(value) ? value.length > 0 : !!value || Constants.FIELD_REQUIRED;
                                                        }
                                                    }
                                                )
                                            }
                                            isClearable
                                        />
                                        {errors.company && <span className="text-red-400 text-md">{errors?.company?.message}</span>}
                                    </div>

                                    <div className="lg:w-2/5 lg:ml-4">
                                        <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-4">Website</div>
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

                                <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-4">Categories</div>
                                <Select
                                    name="categories"
                                    placeholder="Select Categories..."
                                    value={values.selectedOption}
                                    options={categories}
                                    styles={customStyles}
                                    onChange={handleMultiChange}
                                    ref={() =>
                                        register(
                                            { name: "categories" },
                                            {
                                                validate: value => {
                                                    // need to validate if it is undefined or empty array
                                                    return Array.isArray(value) ? value.length > 0 : !!value || Constants.FIELD_REQUIRED;
                                                }
                                            }
                                        )
                                    }
                                    isMulti
                                />
                                {errors.categories && <span className="text-red-400 text-md">{errors?.categories?.message}</span>}
                            </div>

                            <div className="lg:w-2/6 lg:pl-10 lg:mt-0 mt-4">
                                <span className="block text-left text-black lg:text-2xl text-xl font-bold mb-2">Rating</span>

                                <StarRating
                                    totalStars={5}
                                    name="rating"
                                    register={register}
                                    required
                                />
                                {errors.rating && <span className="text-red-400 text-md">{errors?.rating?.message}</span>}

                                <div className="block text-black lg:text-2xl text-xl font-bold mt-8">Tags</div>

                                <InputTag
                                    name="tags"
                                    label="Tags"
                                    register={register}
                                    required />

                                <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-4">Marketplace</div>
                                <div className="flex-row justify-start text-black">
                                    {Constants.MARKETPLACE_OPTIONS.map((country) =>
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
                        <div className="text-black mb-2">
                            <button
                                type="submit"
                                value="Submit"
                                className="mx-auto lg:mx-0 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full my-6 py-4 px-8 shadow opacity-75 text-white gradient">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
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
    allCompanies (sort: { fields: name, order: ASC }) {
        edges {
            node {
                id
                name
                logo
                website
            }
        }
    }
}
`