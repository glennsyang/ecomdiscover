import React from "react"
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
import AuthenticationView from "./authenticationview"
import { useForm } from 'react-hook-form';
import { setUser, isLoggedIn } from "../../utils/auth"
import firebase from "gatsby-plugin-firebase"
import * as Constants from '../../constants'

const SignUp = () => {
    const { register, errors, setError, handleSubmit } = useForm()
    const onSubmit = data => {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(result => {
                // Create user in 'users' collection
                firebase.firestore().collection('users').doc(result.user.uid)
                    .set({
                        created: firebase.firestore.FieldValue.serverTimestamp(),
                        displayName: data.name,
                        email: data.email,
                        photoURL: '',
                        updated: firebase.firestore.FieldValue.serverTimestamp(),
                        helpful: []
                    })
                    .then(() => {
                        // Update the user profile with 'displayName'
                        result.user
                            .updateProfile({
                                displayName: data.name,
                            })
                            .then(() => {
                                setUser(result.user)
                                navigate('/app/profile')
                            })
                            .catch(error => {
                                console.log("Error:", error)
                                alert('An error occurred. Unable to update Name:' + result.user)
                            })
                    })
                    .catch(error => {
                        console.log("Error:", error)
                        alert('An error occurred. Unable to create user:' + data.email)
                    })
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setError("email", "submitError", "*There already exists an account with the given email address.")
                        break
                    case 'auth/invalid-email':
                        setError("email", "submitError", "*E-mail address is not valid.")
                        break
                    case 'auth/operation-not-allowed':
                        setError("email", "submitError", "*E-mail and password accounts are not enabled.")
                        break
                    case 'auth/weak-password':
                        setError("password", "submitError", "*The password is not strong enough.")
                        break
                    default:
                        break
                }
            })
    }

    if (isLoggedIn()) {
        navigate(`/app/profile`)
    }

    return (
        <AuthenticationView title="Sign Up">
            <p className="text-lg">Already have an account? Then please <Link to={`/app/login`} className="text-blue-500 text-left hover:underline">sign in</Link>.</p>
            {firebase &&
                <div className="w-full xl:w-5/6 mt-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="text-left text-black lg:text-2xl text-xl font-bold mb-2">Name*</div>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            ref={register({
                                required: Constants.FIELD_REQUIRED,
                            })}
                            className="text-black w-full rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                        />
                        {errors.name && <span className="text-red-500 text-md">{errors?.name?.message}</span>}
                        {/* E-mail */}
                        <div className="text-left text-black lg:text-2xl text-xl font-bold mb-2 mt-4">E-mail*</div>
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
                        {/* Password */}
                        <div className="text-left text-black lg:text-2xl text-xl font-bold mb-2 mt-4">Password*</div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            ref={register({
                                required: Constants.FIELD_REQUIRED,
                                minLength: { value: 8, message: Constants.VALID_PASSWORD }
                            })}
                            className="text-black w-full rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                        />
                        {errors.password && <span className="text-red-500 text-md">{errors?.password?.message}</span>}
                        <div className="text-black">
                            <button
                                type="submit"
                                value="Submit"
                                className="mx-auto lg:mx-0 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full mt-6 py-4 px-8 shadow opacity-75 text-white gradient">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>}
        </AuthenticationView>
    );
}

export default SignUp