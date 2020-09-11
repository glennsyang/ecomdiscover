import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/dashboard/layout"
import PublishReviews from "../components/dashboard/publishreviews"
import Companies from "../components/dashboard/companies"
import Categories from "../components/dashboard/categories"
import Users from "../components/dashboard/users"
import Marketplaces from "../components/dashboard/marketplaces"
import Faqs from "../components/dashboard/faqs"
import Tags from "../components/dashboard/tags"
import Blogs from "../components/dashboard/blogs"
import Login from "../components/authentication/login"
import PrivateRoute from "../components/authentication/privateroute"

const Dashboard = () => (
    <Layout>
        <Router>
            <PrivateRoute path="/dashboard/publishreviews" component={PublishReviews} />
            <PrivateRoute path="/dashboard/companies" component={Companies} />
            <PrivateRoute path="/dashboard/categories" component={Categories} />
            <PrivateRoute path="/dashboard/users" component={Users} />
            <PrivateRoute path="/dashboard/marketplaces" component={Marketplaces} />
            <PrivateRoute path="/dashboard/faqs" component={Faqs} />
            <PrivateRoute path="/dashboard/tags" component={Tags} />
            <PrivateRoute path="/dashboard/blogs" component={Blogs} />
            <Login path="/app/login" />
        </Router>
    </Layout>
)

export default Dashboard