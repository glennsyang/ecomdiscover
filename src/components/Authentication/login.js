import React from "react"
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
import AuthenticationView from "./authenticationview"
import { useForm } from 'react-hook-form';
import { setUser, isLoggedIn } from "../../utils/auth"
import firebase from "gatsby-plugin-firebase"
import * as Constants from '../../constants'

const Login = ({ location }) => {
    const { register, errors, setError, handleSubmit } = useForm()
    const onSubmit = data => {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(result => {
                setUser(result.user)
                if (location.state.fromShare) {
                    navigate('/app/writereview')
                } else {
                    navigate('/app/profile')
                }
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/wrong-password':
                        setError("password", "submitError", "*Email address or password is not valid.")
                        break
                    case 'auth/invalid-email':
                        setError("email", "submitError", "*Email address or password is not valid.")
                        break
                    case 'auth/user-disabled':
                        setError("email", "submitError", "*Email address has been disabled.")
                        break
                    case 'auth/user-not-found':
                        setError("email", "submitError", "*Email address does not exist.")
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
        <AuthenticationView title="Sign In">
            <p className="text-lg">If you have not created an account yet, then please <Link to={`/app/signup`} className="text-blue-500 text-left hover:underline">sign up</Link> first.</p>
            {firebase &&
                <div className="w-full xl:w-5/6 mt-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-left text-black lg:text-2xl text-xl font-bold mb-2">E-mail*</div>
                        <input
                            type="text"
                            placeholder="E-mail address"
                            aria-label="Enter the E-mail address"
                            name="email"
                            ref={register({
                                required: Constants.FIELD_REQUIRED,
                                pattern: { value: /^\S+@\S+$/i, message: Constants.VALID_EMAIL }
                            })}
                            className="text-black w-full rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                        />
                        {errors.email && <span className="text-red-500 text-md">{errors?.email?.message}</span>}
                        <div className="text-left text-black lg:text-2xl text-xl font-bold mb-2 mt-4">Password*</div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            aria-label="Enter the Password"
                            ref={register({
                                required: Constants.FIELD_REQUIRED,
                                minLength: { value: 8, message: Constants.VALID_PASSWORD }
                            })}
                            className="text-black w-full rounded-md border border-gray-400 shadow-inner py-2 px-2 placeholder-gray-400"
                        />
                        {errors.password && <span className="text-red-500 text-md">{errors?.password?.message}</span>}
                        <div className="text-black">
                            <Link to={`/app/passwordreset`} className="text-blue-500 text-left text-xl hover:underline pr-2">Forgot Password?</Link>
                            <button
                                type="submit"
                                value="Submit"
                                className="mx-auto lg:mx-0 hover:shadow-xl hover:opacity-50 bg-blue-500 font-bold rounded-full mt-6 py-4 px-8 shadow opacity-75 text-white gradient">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>}
        </AuthenticationView>
    );
}

export default Login