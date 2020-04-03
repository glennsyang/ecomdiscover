import React from "react"
import { Link } from "gatsby"

const Category = ({ categories }) => {
    return (
        <div>
            {categories.map((category) =>
                <Link
                    key={category.id}
                    to={`/reviews`}
                    state={{ category: category.name }}
                    className="hover:underline">
                    <span className="mr-1">{category.name},</span>
                </Link>
            )}
        </div>
    )
}

export default Category