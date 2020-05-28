import React, { useState } from "react"
import { Link } from "gatsby"
import { FaSyncAlt, FaBell } from "react-icons/fa"
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import ImageFluid from "../image-fluid"
import SVGImage from "../svgimage"
import Toast from "../toast"

function Header(props) {
    const { title, userInfo } = props
    const imgBlankProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `${userInfo ? userInfo.name : 'Blank'} Profile Photo`,
        imgClass: "h-full w-full object-cover"
    }
    const [toast, setToast] = useState()

    const handleBuildSite = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="border border-gray-300 text-gray-600 antialiased shadow-lg rounded-lg p-10">
                        <h1 className="text-xl font-bold">Rebuild Site!</h1>
                        <p className="text-lg mt-4">Are you sure you want to do this?</p>
                        <p className="text-sm mb-8">(This will take a few minutes to complete)</p>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2"
                            onClick={() => {
                                const toastProps = {
                                    id: Math.floor((Math.random() * 101) + 1),
                                    title: 'Success!',
                                    description: `Site will be updated.`,
                                    color: 'green',
                                }
                                setToast(toastProps)
                                onClose()
                            }}
                        >
                            Yes
                        </button>
                        <button onClick={onClose} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">No</button>
                    </div>
                )
            }
        })
    }
    const handleNotifications = () => {
        const toastProps = {
            id: Math.floor((Math.random() * 101) + 1),
            title: 'Warning!',
            description: `Not yet implemented.`,
            color: 'yellow',
        }
        setToast(toastProps)
    }

    return (
        <header className="bg-white">
            <div className="flex justify-between items-center bg-white">
                <Link to={`/`} title={title} className="text-red-100 pl-4">
                    <SVGImage name="logo" width="100%" height="100%" viewBox="0 0 1450 400" className="h-12 object-cover" />
                </Link>
                <div className="flex justify-between items-center">
                    <button type="button" title="Update Site" onClick={handleBuildSite} className="text-gray-600">
                        <FaSyncAlt size={24} />
                    </button>
                    <button type="button" title="Notifications" onClick={() => handleNotifications()} className="text-gray-600 mx-6">
                        <FaBell size={24} />
                    </button>
                    <div className="flex flex-row items-center bg-gray-200 border-l border-r py-2 px-4 mr-8">
                        <Link to={`/app/profile`} title={`Profile`}>
                            {userInfo
                                ? <img src={userInfo.photo} alt={userInfo.name} className="h-12 w-12 object-cover rounded-full" />
                                : <ImageFluid props={imgBlankProfile} />
                            }
                        </Link>
                        <Link to={`/app/profile`} title={`Profile`} className="pl-4">
                            <span className="block text-sm font-semibold text-gray-600 antialiased">{userInfo ? userInfo.name : 'Admin'}</span>
                            <span className="block text-xs text-gray-600 capitalize antialiased">{userInfo ? userInfo.role : 'Admin'}</span>
                        </Link>
                    </div>
                </div>
            </div>
            <Toast
                toastProps={toast}
                position="bottom-right"
                autoDelete={true}
                autoDeleteTime={2500}
            />
        </header>
    )
}

export default Header
