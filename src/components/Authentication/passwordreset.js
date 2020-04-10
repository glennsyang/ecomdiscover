import React, { useState } from "react"
import { navigate } from '@reach/router'
import AuthenticationView from "./authenticationview"
import PasswordSent from "./passwordsent"
import { useForm } from 'react-hook-form';
import { isLoggedIn } from "../../utils/auth"
import firebase from "gatsby-plugin-firebase"
import * as Constants from '../../constants'

const PasswordReset = () => {
    const [isPasswordSent, setisPasswordSent] = useState(false)

    const { register, errors, setError, handleSubmit } = useForm()
    const onSubmit = data => {
        firebase
            .auth()
            .sendPasswordResetEmail(data.email)
            .then(() => {
                // Password reset email sent.
                setisPasswordSent(true)
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/missing-continue-uri':
                        setError("email", "submitError", "*No continue URL provided.")
                        break
                    case 'auth/invalid-email':
                        setError("email", "submitError", "*E-mail address is not valid.")
                        break
                    case 'auth/invalid-continue-uri':
                        setError("email", "submitError", "*URL provided is invalid.")
                        break
                    case 'auth/user-not-found':
                        setError("email", "submitError", "*There is no user corresponding to the email address.")
                        break
                    default:
                        break
                }
            })
    }

    if (isLoggedIn()) {
        navigate(`/app/profile`)
    }

    if (isPasswordSent) {
        return (
            <AuthenticationView title="Reset Sent!">
                <PasswordSent />
            </AuthenticationView>
        )
    }
    return (
        <AuthenticationView title="Password Reset">
            <p className="text-lg">Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</p>
            {firebase &&
                <div className="w-full xl:w-5/6 mt-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-left text-black lg:text-2xl text-xl font-bold mb-2">E-mail*</div>
                        <input
                            type="text"
                            placeholder="E-mail address"
                            name="email"
                            ref={register({
                                required: Constants.FIELD_REQUIRED,
                                pattern: { value: /^\S+@\S+$/i, message: Constants.VALID_EMAIL }
                            })}
                            className="text-black w-full rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                        />
                        {errors.email && <span className="text-red-500 text-md">{errors?.email?.message}</span>}
                        <div className="text-black">
                            <button
                                type="submit"
                                value="Submit"
                                className="mx-auto lg:mx-0 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full mt-6 py-4 px-8 shadow opacity-75 text-white gradient">
                                Reset My Password
                            </button>
                        </div>
                        <div className="text-lg mt-8 lg:mt-16">
                            Please contact us if you have any trouble resetting your password.
                        </div>
                    </form>
                </div>}
        </AuthenticationView>
    );
}

export default PasswordReset