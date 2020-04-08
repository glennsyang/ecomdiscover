import React from "react"
import { navigate } from '@reach/router';
//import View from "./View"
//import { useState } from "react"
//import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { setUser, isLoggedIn } from "../utils/auth"
//import firebase from "gatsby-plugin-firebase"

const SignUp = () => {

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
        //{firebase && <StyledFirebaseAuth uiConfig={getUiConfig(firebase.auth)} firebaseAuth={firebase.auth()} />}
        <div className="text-blue-700">
            <p>Please sign-up to access:</p>
        </div>
    );

}

export default SignUp