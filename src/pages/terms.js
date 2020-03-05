import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"

export default () => {

    const props = { title: "Terms Of Service", subtitle: "We offer you the web sites, applications, services and content on esellertools.com (“E-Seller Tools”) on the condition that you agree to the following terms." };

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
                        Terms of Service
                    </h3>
                    <p className="text-black text-md mt-2">
                        EACH TIME YOU ACCESS, USE OR REGISTER FOR E-SELLER TOOLS®, YOU ARE SIGNIFYING YOUR AGREEMENT TO THE FOLLOWING TERMS AND CONDITIONS (either the “Terms of Service” or “Agreement”).
                    </p>
                    <p className="text-black text-md mt-2">
                        You may not use E-Seller Tools® if you do not agree to these Terms of Service
                    </p>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        Here is a Summary of Our Terms
                    </h3>
                    <ul className="list-disc list-inside text-black">
                        <li className="mt-2">E-Seller Tools is provided by E-Seller Tools Media, Inc., its providers, licensors and affiliates (either “we” or “us”).</li>
                        <li className="mt-2">These Terms of Service consist of the terms below, our privacy policy, and any supplemental terms that our vendors, Contributors or we may apply to a specific feature, product or subscription that you may purchase from us.</li>
                        <li className="mt-2">These Terms of Service have the same legal effect as an agreement in writing.</li>
                        <li className="mt-2">We can change these terms at any time, in which such changes take effect after we post notices of the changes.</li>
                    </ul>

                    <h3 className="text-black text-xl sm:text-2xl font-semibold mb-2 mt-8">
                        Binding Individual Arbitration
                    </h3>
                    <p className="text-black text-md mt-2">
                        If you prevail on any claim for which you are legally entitled to attorney’s fees, you may seek to recover those fees from the arbitrator. For any claim where you are seeking relief, we will not seek to have you pay our attorney’s fees, even if fees might otherwise be awarded, unless the Arbitrator determines that your claim was frivolous. For purposes of this arbitration provision, references to you and Manta also include respective subsidiaries, affiliates, agents, employees, predecessors, successors and assigns as well as authorized users or beneficiaries of the Services. Subject to and without waiver of the arbitration provisions above, you agree that any judicial proceedings (other than small claims actions in consumer cases as discussed above) will be brought in and you hereby consent to the exclusive jurisdiction and venue in the state courts in the City of Columbus, County of Franklin, or federal court for the State of Ohio.
                    </p>

                    <p className="text-gray-500 text-base italic mt-6">Last Updated: January 3, 2020</p>
                </div>
            </section>
        </Layout>
    )
}