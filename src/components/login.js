import React from "react"
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
//import View from "./View"
//import { useState } from "react"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { setUser, isLoggedIn } from "../utils/auth"
import firebase from "gatsby-plugin-firebase"

const Login = () => {

    if (isLoggedIn()) {
        navigate(`/app/profile`)
    }

    function getUiConfig(auth) {
        return {
            signInFlow: 'popup',
            signInOptions: [
                auth.GoogleAuthProvider.PROVIDER_ID,
                auth.EmailAuthProvider.PROVIDER_ID
            ],
            // signInSuccessUrl: '/app/profile',
            callbacks: {
                signInSuccessWithAuthResult: (result) => {
                    setUser(result.user);
                    navigate('/app/profile');
                }
            }
        };
    }

    return (
        //<View title="Log In">
        //</View>
        <div className="container mx-auto bg-white">
            <div className="bg-white px-4 pt-6 pb-8 mb-4 md:mx-24 lg:mx-64">
                <h1 className="text-2xl font-bold">Sign In</h1>
                <p>If you have not created an account yet, then please <Link to={`/app/signup`} className="text-blue-500">sign up</Link> first.</p>
                {firebase && <StyledFirebaseAuth uiConfig={getUiConfig(firebase.auth)} firebaseAuth={firebase.auth()} />}
            </div>
        </div>
    );

}

export default Login