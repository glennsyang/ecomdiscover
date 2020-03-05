import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
    <Layout>
        <SEO
            title="About"
            keywords={[`amazon`, `seller`, `tools`, `FBA`]}
        />
        <section className="pt-4 flex flex-col flex-grow overflow-hidden bg-white">
            <div className="container mx-auto px-6 pb-12">

                <h1 className="text-3xl sm:text-4xl font-semibold text-black pt-8 pb-4">ABOUT US</h1>
                <h2 className="sm:text-xl font-light text-black">
                    A collection of ecommerce resources. Primarily related to FBA, but also touching on many other aspects of ecommerce software and resources.
                </h2>

                <h3 className="text-black text-xl font-semibold mb-2 mt-10">
                    Borrow some experience
                </h3>
                <p className="text-black text-lg">
                    More than 6 million households nationwide check Angie's List reviews to find the best local service providers, like roofers, plumbers, handymen, mechanics, doctors and dentists. And that's just the short list. We collect ratings and reviews on more than 720 different services. The people who join Angie's List are just like you — real folks looking for a way to find trustworthy companies that perform high-quality work.
                </p>

                <h3 className="text-black text-xl font-semibold mb-2 mt-8">
                    "Ratings, Reviews and (Sometimes) Revenge"
                </h3>
                <p className="text-black text-lg">
                    Angie's List members submit more than 60,000 reviews every month about the companies they hire. They include incredible details about how the project went (including cost), and grade the company's response time, price, professionalism and quality of work -- good or bad -- on an A to F scale. Angie's List members will tell you if a crew was conscious of children and pets, cleaned up after themselves or just totally botched the job.
                </p>

                <h3 className="text-black text-xl font-semibold mb-2 mt-8">
                    Power in numbers
                </h3>
                <p className="text-black text-lg">
                    Through Angie's List, you have the ability to quickly and easily tell thousands of other Angie's List members about your experiences with a company. That's really great news for the companies that do quality work - and not so great news for the companies that don't. So when contractors know that you're an Angie's List member, we've found that you're more likely to get a quick call back, the crews show up on time and work is completed faster.
                </p>
            </div>
        </section>
    </Layout>
)