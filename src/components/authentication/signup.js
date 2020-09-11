import React, { useState } from "react"
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import firebase from "gatsby-plugin-firebase"
import AuthenticationView from "./authenticationview"
import { setUser, isLoggedIn } from "../../utils/auth"
import * as Constants from '../../constants'
import Toast from "../toast"

const SignUp = () => {
    const [toast, setToast] = useState()
    const { register, errors, setError, handleSubmit } = useForm()

    const onSubmit = data => {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(result => {
                // Create user in 'users' collection
                createUserInDatabase(result.user, result.user.uid, data.name, data.email, '', true)
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
    const handleSignUpWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //var token = result.credential.accessToken
            var user = result.user
            // Create user in 'users' collection
            createUserInDatabase(user, user.uid, user.displayName, user.email, user.photoURL, false)
        }).catch(error => {
            console.log("error:", error)
            const toastProperties = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Error',
                description: `There was an error while signing in: ${error.message}.`,
                color: 'red',
            }
            setToast(toastProperties)
        })
    }
    const createUserInDatabase = (user, uid, name, email, photoURL, isUpdateDisplayName) => {
        // Check if user already exists
        firebase.firestore().collection('users').doc(uid).get().then(doc => {
            if (!doc.exists) {
                // Create user in 'users' collection
                firebase.firestore().collection('users').doc(uid)
                    .set({
                        active: true,
                        created: firebase.firestore.FieldValue.serverTimestamp(),
                        displayName: name,
                        email: email,
                        helpful: [],
                        photoURL: photoURL !== '' ? photoURL : '',
                        reviews: [],
                        role: 'user',
                        updated: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then(() => {
                        if (isUpdateDisplayName) {
                            // Update the user profile with 'displayName'
                            user
                                .updateProfile({ displayName: name, })
                                .then(() => {
                                    setUser(user)
                                    navigate('/app/profile')
                                })
                                .catch(error => {
                                    console.log("Error:", error)
                                    const toastProperties = {
                                        id: Math.floor((Math.random() * 101) + 1),
                                        title: 'Error',
                                        description: 'There was an error in updating your Name in your Profile.',
                                        color: 'red',
                                    }
                                    setToast(toastProperties)
                                })
                        } else {
                            setUser(user)
                            navigate('/app/profile')
                        }
                    })
                    .catch(error => {
                        console.log("Error:", error)
                        const toastProperties = {
                            id: Math.floor((Math.random() * 101) + 1),
                            title: 'Error',
                            description: `Could not create Profile for user ${email}.`,
                            color: 'red',
                        }
                        setToast(toastProperties)
                    })
            } else {
                setUser(user)
                navigate('/app/profile')
            }
        }).catch(error => {
            console.log("error:", error)
            const toastProperties = {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Error',
                description: `An error ocurred while signing up: ${error} .`,
                color: 'red',
            }
            setToast(toastProperties)
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
                            aria-label="Name"
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
                            aria-label="E-mail address"
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
                            aria-label="Password"
                            ref={register({
                                required: Constants.FIELD_REQUIRED,
                                minLength: { value: 8, message: Constants.VALID_PASSWORD }
                            })}
                            className="text-black w-full rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                        />
                        {errors.password && <span className="text-red-500 text-md">{errors?.password?.message}</span>}
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <button
                                type="submit"
                                value="Submit"
                                className="w-32 sm:w-auto mt-6 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full py-4 px-8 shadow opacity-75 text-white gradient">
                                Sign Up
                            </button>
                            <button
                                name="loginwithgoogle"
                                type="button"
                                value="SignInWithGoogle"
                                onClick={handleSignUpWithGoogle}
                                className="w-56 sm:w-auto mt-8 mb-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 sm:px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                                <FcGoogle size={18} className="mx-2 sm:mr-2 sm:ml-0" />
                                Sign up with Google
                            </button>
                        </div>
                    </form>
                </div>
            }
            <Toast
                toastProps={toast}
                position="bottom-right"
                autoDelete={true}
                autoDeleteTime={2500}
            />
        </AuthenticationView>
    )
}

export default SignUp