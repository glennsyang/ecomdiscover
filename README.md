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
