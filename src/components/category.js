import React from "react"
import { Link } from "gatsby"

const CategoryDisplay = (props) => {
    const { category, className } = props
    return (<div className={className}>{category.name}</div>)
}

const Category = (props) => {
    const { categories, className, useLink } = props

    return (
        <div>
            {useLink ?
                categories.map(category =>
                    <Link key={category.id} to={`/companies`} state={{ category: category.name }}>
                        <CategoryDisplay category={category} className={className} />
                    </Link>
                )
                :
                categories.map(category =>
                    <CategoryDisplay key={category.id} category={category} className={className} />
                )
            }
        </div>
    )
}

export default Category