import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/profile"
import WriteReview from "../pages/writereview"
import Login from "../components/login"
import SignUp from "../components/signup"
import PrivateRoute from "../components/privateroute"

const App = () => (
    <Layout>
        <Router>
            <PrivateRoute path="/app/profile" component={Profile} />
            <PrivateRoute path="/writereview" component={WriteReview} />
            <Login path="/app/login" />
            <SignUp path="/app/signup" />
        </Router>
    </Layout>
)

export default App