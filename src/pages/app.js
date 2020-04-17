import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/authentication/profile"
import Login from "../components/authentication/login"
import SignUp from "../components/authentication/signup"
import PasswordReset from "../components/authentication/passwordreset"
import PrivateRoute from "../components/authentication/privateroute"
import WriteReview from "../pages/writereview"

const App = () => (
    <Layout>
        <Router>
            <PrivateRoute path="/app/profile" component={Profile} />
            <Login path="/app/login" />
            <SignUp path="/app/signup" />
            <PasswordReset path="/app/passwordreset" />
            <WriteReview path="/app/writereview" />
        </Router>
    </Layout>
)

export default App