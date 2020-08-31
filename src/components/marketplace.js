import React from "react"

const Marketplace = ({ marketplace, className }) => {
    return (
        <img src={marketplace.flag} alt={marketplace.code} title={marketplace.name} className={className} />
    )
}

export default Marketplace