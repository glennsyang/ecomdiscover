import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/dashboard/layout"
import Index from "../components/dashboard/index"
import Login from "../components/dashboard/login"
import DashboardRoute from "../components/dashboard/dashboardroute"

const Dashboard = () => (
    <Layout>
        <Router>
            <DashboardRoute path="/dashboard/index" component={Index} />
            <Login path="/dashboard/login" />
        </Router>
    </Layout>
)

export default Dashboard