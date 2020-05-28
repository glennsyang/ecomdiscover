import React from "react"
import { Link } from "gatsby"
import Tag from "./tag"
import Category from './category'
import { useCategories } from "../hooks/use-categories"

const SearchDisplay = (props) => {
    const { allCategories } = useCategories()

    if (props.props.type === 'companies') {
        const { id, name, slug, categories } = props.props
        const categories1 = categories.map(category => {
            return allCategories.nodes.find(x => x.name === category)
        })
        return (
            <Link key={id} to={slug} className="block px-4 py-3 text-gray-800 hover:bg-gray-100 hover:text-blue-500">
                <h1 className="text-black text-base font-bold">
                    <span className="text-gray-500 text-sm font-semibold mr-2">Company:</span>{name}
                </h1>
                <Category categories={categories1} useLink={false} className="inline-block bg-gray-100 border border-gray-200 rounded-md px-2 text-xs font-semibold text-black tracking-tight mr-1" />
            </Link>
        )
    } else {
        const { id, title, tags, slug } = props.props
        return (
            <Link key={id} to={slug} className="block px-4 py-3 text-gray-800 hover:bg-gray-100 hover:text-blue-500">
                <h1 className="text-black text-base font-bold">
                    <span className="text-gray-500 text-sm font-semibold mr-2">Review:</span>{title}
                </h1>
                <Tag tags={tags} />
            </Link>
        )
    }
}

export default SearchDisplay