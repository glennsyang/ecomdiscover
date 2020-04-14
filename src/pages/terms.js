import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export default ({ data }) => {
    const { title, website } = useSiteMetadata()
    const props = {
        title: "Terms Of Service",
        subtitle: `We offer you the web sites, applications, services and content on ${website} (“${title}”) on the condition that you agree to the following terms.`
    }

    return (
        <Layout>
            <SEO
                title="Terms Of Service"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-8 pb-10">

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-10">
                        OVERVIEW
                    </h3>
                    <p className="text-black text-md mt-2">
                        This website is operated by {data.site.siteMetadata.title}. Throughout the site, the terms “we”, “us” and “our” refer to {data.site.siteMetadata.title}. {data.site.siteMetadata.title} offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                    </p>
                    <p className="text-black text-md mt-2">
                        By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
                    </p>
                    <p className="text-black text-md mt-2">
                        Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
                    </p>
                    <p className="text-black text-md mt-2">
                        Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 1 - ONLINE STORE TERMS
                    </h3>
                    <p className="text-black text-md mt-2">
                        By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                        You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
                        You must not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 2 - GENERAL CONDITIONS
                    </h3>
                    <p className="text-black text-md mt-2">
                        We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
                        You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
                        The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
                    </h3>
                    <p className="text-black text-md mt-2">
                        We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.
                        This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES
                    </h3>
                    <p className="text-black text-md mt-2">
                        Prices for our products are subject to change without notice.
                        We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                        We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 5 - PRODUCTS OR SERVICES (if applicable)
                    </h3>
                    <p className="text-black text-md mt-2">
                        Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
                        We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
                        We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.
                        We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION
                    </h3>
                    <p className="text-black text-md mt-2">
                        We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e‑mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.
                        You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
                    </p>



                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 19 - CHANGES TO TERMS OF SERVICE
                    </h3>
                    <p className="text-black text-md mt-2">
                        You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
                    </p>

                    <p className="text-gray-500 text-base italic mt-6">Last Updated: March 6, 2020</p>
                </div>
            </section>
        </Layout>
    )
}
