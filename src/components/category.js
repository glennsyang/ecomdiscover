import React from "react"
import { Link } from "gatsby"

const Category = (props) => {
    const { categories, className } = props

    return (
        <div>
            {categories.map(category =>
                <Link to={`/reviews`} state={{ category: category.name }}>
                    <div
                        key={category.id}
                        className={className}>
                        {category.name}
                    </div>
                </Link>
            )}
        </div>
    )
}

export default Category