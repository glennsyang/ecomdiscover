# Ecom Discover - Ecommerce Tools & Services Reviews


## About

A collection of e-commerce resources. Primarily related to FBA, but also touching on many other aspects of e-commerce software and resources.


## Built With

[Gatsby](https://github.com/gatsbyjs/gatsby)

[Tailwind-CSS](https://tailwindcss.com)

## Author

[Glenn Sheppard](https://glennsheppard.dev)


{/* Ads */}
                        <div className="sm:w-1/3 mt-2 lg:ml-2">
                            <a href="https://www.digitalocean.com" rel="noopener noreferrer" target="_blank">
                                <ImageFixed props={imgAds} />
                            </a>
                        </div>


                        <div className="flex flex-col lg:flex-row mt-2 bg-red-500">

                            <div className="lg:w-3/5 flex flex-col lg:flex-row">
                                {/* Logo */}
                                <div className="flex items-center lg:ml-2">
                                    <a href={`${review.company.website}`} rel="noopener noreferrer" target="_blank">
                                        <ImageFixed props={imgLogo} />
                                    </a>
                                </div>
                            </div>

                            <div className="lg:w-2/5 flex flex-col lg:flex-row justify-between lg:block">
                                {/* Website */}
                                <h3 className="flex text-xl font-bold text-black mb-2">Website</h3>
                                {/* Website */}
                                <a href={`${review.company.website}`} rel="noopener noreferrer" target="_blank">
                                    <span className="text-gray-500 underline text-md mt-2">{review.company.website}</span>
                                </a>
                                {/* Marketplace */}
                                <h3 className="flex text-xl font-bold text-black mb-2 mt-2">Marketplace</h3>
                                <div>
                                    <span className="text-gray-500 text-md mt-2">{review.marketplace.join(', ')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-xl">

                            <Link title={`${review.username} reviews`} to={`/`} className="h-20 w-20 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                                {/* <ImageFluid props={imgProfile} /> */}
                            </Link>
                            <div className="flex flex-col leading-tight">
                                <h1 className="text-2xl font-bold text-black">
                                    {review.title}
                                </h1>
                                <h3 className="text-md text-gray-600">
                                    <Link to={`/`} className="text-gray-600">By {review.username}</Link>
                                    <small className="text-gray-500"> • {review.created}</small>
                                </h3>
                                {/* Categories */}
                                <h4 className="text-gray-500 text-sm mt-2">
                                    <Category categories={review.categories} />
                                </h4>
                            </div>

                            {/* Star Ratings */}
                            <div className="text-xl font-bold text-black mb-2">Rating</div>
                            <div className="flex flex-col">
                                <div className="flex mt-2">
                                    <div className="flex text-3xl flex-1 notouch">
                                        {starRating}
                                    </div>
                                    <div className="flex text-3xl -mt-2 font-bold text-black items-center">
                                        <span>{review.rating}</span>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-600 text-right block mt-2">from 1 rating</span>
                            </div>
                            <div className="mb-8">
                                {/* Tags */}
                                <Tag tags={review.tags} />
                            </div>
                            {/* Content */}
                            <h3 className="text-2xl sm:text-2xl font-semibold text-black mt-4">Review</h3>
                            <div className="sm:text-lg font-light text-black mt-2 mb-2" dangerouslySetInnerHTML={{ __html: review.content }} />
                        </div>