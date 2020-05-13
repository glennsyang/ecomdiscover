import React from "react"
import { navigate } from '@reach/router'
import { setUser, isLoggedIn } from "../../utils/auth"

const Login = () => {
    if (isLoggedIn()) {
        navigate(`/dashboard/index`)
    }

    return (
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
            <div className="w-full max-w-lg">
                <div className="leading-loose">
                    <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
                        <p className="text-gray-800 font-medium text-center text-lg font-bold">Login</p>
                        <div className="">
                            <label className="block text-sm text-gray-00" for="username">Username</label>
                            <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="username" name="username" type="text" required="" placeholder="User Name" aria-label="username" />
                        </div>
                        <div className="mt-2">
                            <label className="block text-sm text-gray-600" for="password">Password</label>
                            <input className="w-full px-5  py-1 text-gray-700 bg-gray-200 rounded" id="password" name="password" type="text" required="" placeholder="*******" aria-label="password" />
                        </div>
                        <div className="mt-4 items-center justify-between">
                            <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Login</button>
                            <a className="inline-block right-0 align-baseline  font-bold text-sm text-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a>
                        </div>
                        <a className="inline-block right-0 align-baseline font-bold text-sm text-500 hover:text-blue-800" href="#">
                            Not registered ?
                        </a>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login