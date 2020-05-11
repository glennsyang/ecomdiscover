import React from "react"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"

export const useCompaniesFirestore = () => {
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        const companies = []
        firebase.firestore().collection('companies').get().then(docs => {
            //console.log(`Found ${docs.length} Companies`)
            docs.forEach(doc => {
                const company = doc.data()
                // Created Date
                company.created = `${moment.utc(company.created.toDate()).format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`
                // Categories
                const categoriesArr = []
                const categories = doc.get("categories")
                categories.map(category => {
                    category.get().then(catDocs => {
                        categoriesArr.push({ id: catDocs.id, name: catDocs.data().name })
                    })
                })
                company.categories = categoriesArr
                // Marketplaces
                const marketplacesArr = []
                const marketplaces = doc.get("marketplaces")
                marketplaces.map(marketplace => {
                    marketplace.get().then(docs => {
                        marketplacesArr.push({ id: docs.data().code, name: docs.data().name, flag: docs.data().flag, code: docs.data().code })
                    })
                })
                company.marketplaces = marketplacesArr
                // Reviews
                const reviewsArr = []
                const reviews = doc.get("reviews")
                reviews.map(review => {
                    review.get().then(doc => {
                        if (doc.exists) {
                            const createdAt = `${moment.utc(doc.data().created.toDate()).format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`
                            reviewsArr.push({ id: doc.id, title: doc.data().title, content: doc.data().content, created: createdAt, rating: doc.data().rating, tags: doc.data().tags, })
                        }
                    })
                })
                company.reviews = reviewsArr


                companies.push(company)
            })
            setData(companies)
        })
    }, [])

    return data
}
