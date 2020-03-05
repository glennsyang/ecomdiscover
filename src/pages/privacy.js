import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"

export default () => {

    const props = { title: "Privacy Policy", subtitle: "This privacy policy explains what information is collected when you use the Web sites, content and services of esellertools.com (“E-Seller Tools”)" };

    return (
        <Layout>
            <SEO
                title="Privacy Policy"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-8 pb-10">

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-10">
                        Your Information
                    </h3>
                    <p className="text-black text-md mt-2">
                        E-Seller Tools is provided by E-Seller Tools Media, Inc. and its affiliates (“we” or “us”). Your E-Seller Tools information consists of personally identifiable information collected or received about you when you make purchases from us, when you register with us, when you set up profiles to share with others, when you interact with other users on E-Seller Tools, or when you log in to E-Seller Tools as a registered user and interact with E-Seller Tools products and services. Your E-Seller Tools information may include (a) registration-related information (such as name, address, telephone and fax numbers, email address); (b) member profile about yourself that you can share with others; (c) a profile on your business or your profession that you desire to share with others, (d) transaction-related information (such as credit card or other preferred means of payment, or a history of products purchased through us); (e) information about your visits to E-Seller Tools or our other web sites, pages and services; (f) your responses to our offerings and advertisements; (g) information about the features or offerings you use from us; (h) your billing and shipping information; (i) customer service information; and (j) other information specifically related to your use of a particular E-Seller Tools feature or offering. Your information may be supplemented with additional information from other companies such as publicly available information and other information that we may append or match to your information.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        Changes
                    </h3>
                    <p className="text-black text-md mt-2">
                        We may update this Privacy Policy from time to time, and so you should review this Policy periodically. If there are significant changes to our information practices, you will be provided with appropriate online notice. You may be provided other privacy-related information in connection with your use of offerings from us as well as for special features and services not described in this Policy that may be introduced in the future.
                    </p>

                    <p className="text-gray-500 text-base italic mt-6">Last Updated: December 19, 2019</p>
                </div>
            </section>
        </Layout>
    )
}