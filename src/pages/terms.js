import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

export default () => {
    const { title, website } = useSiteMetadata()
    const props = {
        title: "Terms Of Service",
        subtitle: `We offer you the web sites, applications, services and content on ${website} (“${title}”) on the condition that you agree to the following terms.`
    }

    return (
        <Layout>
            <SEO
                title="Terms Of Service"
                keywords={[`terms of service`, `aura repricer`, `ecommerce`, `FBA`, `amazon repricer`, `profit monitoring`, `listing optimization`]}
                description={props.subtitle}
            />
            <section className="bg-gray-100">

                <PageHeader props={props} />

                <div className="container mx-auto px-8 pb-10">

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-10">
                        OVERVIEW
                    </h3>
                    <p className="text-black text-md mt-2">
                        This website is operated by {title}. Throughout the site, the terms “we”, “us” and “our” refer to {title}. {title} offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
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
                        By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You must not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 2 - GENERAL CONDITIONS
                    </h3>
                    <p className="text-black text-md mt-2">
                        We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us. The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
                    </h3>
                    <p className="text-black text-md mt-2">
                        We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk. This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES
                    </h3>
                    <p className="text-black text-md mt-2">
                        Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 5 - LINKS
                    </h3>
                    <p className="text-black text-md mt-2">
                        {title} has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by {title} of the site. Use of any such linked web site is at the user’s own risk.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 6 - RESPONSIBILITY FOR CONTENT
                    </h3>
                    <p className="text-black text-md mt-2">
                        You alone are responsible for Your Content, and once posted to {title}, it cannot always be withdrawn. You assume all risks associated with Your Content, including anyone’s reliance on its quality, accuracy, or reliability, and any risks associated with personal information you disclose. You represent that you own or have the necessary permissions to use and authorize the use of Your Content as described herein. You may not imply that Your Content is in any way sponsored or endorsed by {title}.
                        You may expose yourself to liability if, for example, Your Content contains material that is false, intentionally misleading, or defamatory; violates any third-party right, including any copyright, trademark, service mark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right; contains material that is unlawful, violates or advocates the violation of any law or regulation; or violates these Terms.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 7 - OUR RIGHT TO USE YOUR CONTENT
                    </h3>
                    <p className="text-black text-md mt-2">
                        Our Right to Use Your Content. We may use Your Content in a number of different ways, including by publicly displaying it, reformatting it, incorporating it into advertisements and other works, creating derivative works from it, promoting it, distributing it, and allowing others to do the same in connection with their own websites and media platforms (“Other Media”). As such, you hereby irrevocably grant us world-wide, perpetual, non-exclusive, royalty-free, assignable, sublicensable, transferable rights to use Your Content for any purpose. Please note that you also irrevocably grant the users of the Service and any Other Media the right to access Your Content in connection with their use of the Service and any Other Media. Finally, you irrevocably waive, and cause to be waived, against {title} and its users any claims and assertions of moral rights or attribution with respect to Your Content. By “use” we mean use, copy, publicly perform and display, reproduce, distribute, modify, translate, remove, analyze, commercialize, and prepare derivative works of Your Content.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 8 - ADVERTISING
                    </h3>
                    <p className="text-black text-md mt-2">
                        {title} and its licensees may publicly display advertisements, paid content, and other information nearby or in association with Your Content. You are not entitled to any compensation for such advertisements. The manner, mode and extent of such advertising are subject to change without specific notice to you.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 9 - OTHER CONTENT RELATED NOTES
                    </h3>
                    <p className="text-black text-md mt-2">
                        User Content (including any that may have been created by users employed or contracted by {title}) does not necessarily reflect the opinion of {title}. Except as required by law, we have no obligation to retain or provide you with copies of Your Content, and we do not guarantee any confidentiality with respect to Your Content. We reserve the right to remove, screen, edit, or reinstate User Content at our sole discretion for any reason or no reason, and without notice to you. For example, we may remove a review if we believe it violates our Content Guidelines.
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        SECTION 10 - CHANGES TO TERMS OF SERVICE
                    </h3>
                    <p className="text-black text-md mt-2">
                        You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
                    </p>

                    <p className="text-gray-500 text-base italic mt-6">Last Updated: September 14, 2020</p>
                </div>
            </section>
        </Layout>
    )
}
