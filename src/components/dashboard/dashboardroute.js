import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { isLoggedIn } from "../../utils/auth"

const DashboardRoute = ({ component: Component, location, ...rest }) => {
    if (!isLoggedIn() && location.pathname !== `/dashboard/login`) {
        // If we’re not logged in, redirect to the home page.
        navigate(`/dashboard/login`)
        return null
    }

    return <Component {...rest} />
}

DashboardRoute.propTypes = {
    component: PropTypes.any.isRequired,
}

export default DashboardRoute