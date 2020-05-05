# Ecom Discover - Ecommerce Tools & Services Reviews


## About

A collection of e-commerce resources. Primarily related to FBA, but also touching on many other aspects of e-commerce software and resources.


## Built With

[Gatsby](https://github.com/gatsbyjs/gatsby)

[Tailwind-CSS](https://tailwindcss.com)

[Firebase](https://firebase.io)

## Author

[Glenn Sheppard](https://glennsheppard.dev)


<textarea
                                            type="text"
                                            name="content"
                                            placeholder="By sharing your experiences you're helping businesses make better choices. Thank you!"
                                            ref={register({ required: { value: true, message: Constants.FIELD_REQUIRED } })}
                                            className="text-black text-lg w-full block box-border rounded-md border border-gray-400 shadow-inner py-2 px-2 h-40 placeholder-gray-400"
                                        />

                                        <ReactQuill
                                            name="content"
                                            placeholder="By sharing your experiences you're helping businesses make better choices. Thank you!"
                                            value={content}
                                            onChange={handleChangeContent}
                                            modules={Constants.editorModules}
                                            formats={Constants.editorFormats}
                                            theme="snow"
                                        />
                                        {errors.content && <span className="text-red-400 text-md">{errors?.content?.message}</span>}

                                        