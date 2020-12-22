import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

export default () => {
  const { website } = useSiteMetadata()
  const title = "Privacy Policy"
  const subtitle = `This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from ${website} (the “Site”).`

  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        keywords={[`privacy policy`, `aura repricer`, `ecommerce`, `FBA`, `amazon repricer`, `profit monitoring`, `listing optimization`]}
        description={subtitle}
      />
      <section className="bg-gray-100">
        <PageHeader title={title} subtitle={subtitle} />
        <div className="container mx-auto px-8 pb-10">
          <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-10">
            PERSONAL INFORMATION WE COLLECT
          </h3>
          <p className="text-black text-md mt-2">
            When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”
          </p>
          <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
            We collect Device Information using the following technologies:
          </h3>
          <ul className="list-disc list-inside text-black text-md mt-2">
            <li>
              “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.
            </li>
            <li>
              “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
            </li>
            <li>
              “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.
            </li>
          </ul>
          <p className="text-black text-md mt-8">
            Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers [[INSERT ANY OTHER PAYMENT TYPES ACCEPTED]], email address, and phone number. We refer to this information as “Order Information.”
          </p>
          <p className="text-black text-md mt-8">
            When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.
          </p>
          <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
            HOW DO WE USE YOUR PERSONAL INFORMATION?
          </h3>
          <p className="text-black text-md mt-2">
            We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
          </p>
          <ul className="list-disc list-inside text-black text-md mt-2">
            <li>Communicate with you;</li>
            <li>Screen our orders for potential risk or fraud; and</li>
            <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
          </ul>
          <p className="text-black text-md mt-8">
            We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
          </p>
          <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
            SHARING YOUR PERSONAL INFORMATION
          </h3>
          <p className="text-black text-md mt-2">
            We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here: <a href="https://www.shopify.com/legal/privacy" className="text-blue-500" rel="noopener noreferrer" target="_blank">https://www.shopify.com/legal/privacy</a>. We also use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" className="text-blue-500" rel="noopener noreferrer" target="_blank">https://www.google.com/intl/en/policies/privacy/</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-500" rel="noopener noreferrer" target="_blank">https://tools.google.com/dlpage/gaoptout</a>.
          </p>
          <p className="text-black text-md mt-8">
            Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
          </p>
          <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
            BEHAVIOURAL ADVERTISING
          </h3>
          <p className="text-black text-md mt-2">
            As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" className="text-blue-500" rel="noopener noreferrer" target="_blank">http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work</a>.
          </p>
          <p className="text-black text-md mt-8">
            You can opt out of targeted advertising by:
          </p>
          <ul className="list-none list-inside text-black text-md mt-2">
            <li className="mt-2">
              <a href="https://www.facebook.com/settings/?tab=ads" className="text-blue-500" rel="noopener noreferrer" target="_blank">FACEBOOK</a>
            </li>
            <li className="mt-2">
              <a href="https://www.google.com/settings/ads/anonymous" className="text-blue-500" rel="noopener noreferrer" target="_blank">GOOGLE</a>
            </li>
            <li className="mt-2">
              <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" className="text-blue-500" rel="noopener noreferrer" target="_blank">BING</a>
            </li>
          </ul>
          <p className="text-black text-md mt-8">
            Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: <a href="http://optout.aboutads.info/" className="text-blue-500" rel="noopener noreferrer" target="_blank">http://optout.aboutads.info/</a>.
          </p>
          <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
            DO NOT TRACK
          </h3>
          <p className="text-black text-md mt-2">
            Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
          </p>
          <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
            YOUR RIGHTS
          </h3>
          <p className="text-black text-md mt-2">
            If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
          </p>
          <p className="text-black text-md mt-8">
            Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.
          </p>
          <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
            DATA RETENTION
          </h3>
          <p className="text-black text-md mt-2">
            When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
          </p>
          <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
            CHANGES
          </h3>
          <p className="text-black text-md mt-2">
            We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
          </p>
          <p className="text-gray-500 text-base italic mt-6">Last Updated: March 6, 2020</p>
        </div>
      </section>
    </Layout>
  )
}
