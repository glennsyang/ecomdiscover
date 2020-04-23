# Ecom Discover - Ecommerce Tools & Services Reviews


## About

A collection of e-commerce resources. Primarily related to FBA, but also touching on many other aspects of e-commerce software and resources.


## Built With

[Gatsby](https://github.com/gatsbyjs/gatsby)

[Tailwind-CSS](https://tailwindcss.com)

## Author

[Glenn Sheppard](https://glennsheppard.dev)

const components = {
    DropdownIndicator: null,
}
const createTag = (label) => ({
    label,
    value: label,
})

<CreatableSelect
                                    name="tags"
                                    label="Tags"
                                    ref={register}
                                    components={components}
                                    inputValue={inputValue}
                                    isClearable
                                    isMulti
                                    menuIsOpen={false}
                                    onChange={handleChangeTag}
                                    onInputChange={handleInputChangeTag}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type something and press enter..."
                                    value={tagValue}
                                />

    <div className="block text-left text-black lg:text-2xl text-xl font-bold mt-4">Categories</div>
                                            <Select
                                                name="categories"
                                                placeholder="Select Categories..."
                                                value={values.selectedOption}
                                                options={categories}
                                                styles={Constants.customStyles}
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
