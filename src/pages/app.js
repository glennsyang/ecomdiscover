import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/Authentication/profile"
import Login from "../components/Authentication/login"
import SignUp from "../components/Authentication/signup"
import PasswordReset from "../components/Authentication/passwordreset"
import PrivateRoute from "../components/Authentication/privateroute"
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