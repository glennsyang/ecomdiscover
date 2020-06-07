import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/auth/profile"
import Login from "../components/auth/login"
import SignUp from "../components/auth/signup"
import PasswordReset from "../components/auth/passwordreset"
import PrivateRoute from "../components/auth/privateroute"
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