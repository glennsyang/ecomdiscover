import React from "react"
import { Link } from "gatsby"
import { FaAngleDoubleLeft } from "react-icons/fa"
import ImageFluid from "../image-fluid"
import SVGImage from "../svgimage"

function Header(props) {
    const { title, userInfo } = props
    const imgBlankProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `${userInfo ? userInfo.name : 'Blank'} Profile Photo`,
        imgClass: "h-full w-full object-cover"
    }
    const onToggleSideBar = () => { props.onToggle && props.onToggle() }

    return (
        <header className="bg-white">
            <div className="flex justify-between">
                <div className="w-1/6 flex justify-between items-center bg-gray-800">
                    <div className="pl-6">
                        <Link to={`/`} title={title} className="text-gray-300 text-lg font-bold antialiased">Dashboard</Link>
                    </div>
                    <button type="button" className="pr-4 outline-none focus:outline-none" onClick={onToggleSideBar}>
                        <FaAngleDoubleLeft size={16} className="text-gray-300" />
                    </button>
                </div>
                <div className="flex justify-between items-center mx-4 py-2">
                    <Link to={`/`} title={title}><SVGImage name="logo" width="100%" height="100%" viewBox="0 0 1450 400" className="h-12 object-cover" /></Link>
                    <span className="text-gray-600 px-4">{userInfo ? userInfo.name : 'Admin'}</span>
                    <Link to={`/app/profile`} title={`${userInfo ? userInfo.name : 'User'} Profile`}>
                        {userInfo
                            ? <img src={userInfo.photo} alt={userInfo.name} className="h-12 w-12 object-cover rounded-full" />
                            : <ImageFluid props={imgBlankProfile} />
                        }
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
