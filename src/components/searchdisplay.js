import React from "react"
import { Link } from "gatsby"
import Tag from "./tag"
import Category from './category'
import { useCategories } from "../hooks/useCategories"
import { useCompanies } from "../hooks/useCompanies"

const SearchDisplay = ({ props }) => {
    const { allCategories } = useCategories()
    const { allCompanies } = useCompanies()

    if (props.type === 'companies') {
        const { id, name, slug, categories } = props
        const categories1 = categories.map(category => {
            return allCategories.nodes.find(x => x.name === category)
        })
        return (
            <Link key={id} to={slug} className="block px-2 md:px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-500">
                <div className="flex flex-row antialiased">
                    <div className="w-1/4 md:w-1/5 border-r pr-2">
                        <p className="text-gray-500 text-xs md:text-sm font-semibold text-right">
                            {name}
                        </p>
                    </div>
                    <div className="w-3/4 md:w-4/5 pl-2">
                        <Category categories={categories1} useLink={false} className="inline-block bg-gray-100 border border-gray-200 rounded-md px-2 text-xs font-semibold text-black tracking-tight mr-1" />
                    </div>
                </div>
            </Link>
        )
    } else {
        const { id, title, content, tags, slug, company } = props
        const compObj = allCompanies.nodes.find(x => x.id === company)
        const truncContent = content.replace(/(.{125})..+/, "$1&hellip;");
        return (
            <Link key={id} to={slug} className="block px-2 md:px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-500">
                <div className="flex flex-row antialiased">
                    <div className="w-1/4 md:w-1/5 border-r pr-2">
                        <p className="text-gray-500 text-xs md:text-sm font-semibold text-right">
                            {compObj.name}
                        </p>
                    </div>
                    <div className="w-3/4 md:w-4/5 flex flex-col pl-2">
                        <div className="flex flex-row">
                            <p className="text-black text-sm md:text-base font-bold mr-2">{title}</p>
                            <Tag tags={tags} />
                        </div>
                        <div className="text-gray-600 text-xs font-light"
                            dangerouslySetInnerHTML={{ __html: truncContent }}
                        />
                    </div>
                </div>
            </Link>
        )
    }
}

export default SearchDisplay