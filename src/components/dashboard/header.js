import React from "react"
import { Link } from "gatsby"
import ImageFluid from "../image-fluid"
import SVGImage from "../svgimage"

function Header(props) {
    const { title, userInfo } = props
    const imgBlankProfile = {
        imgName: "blank_profile_picture.png",
        imgAlt: `${userInfo ? userInfo.name : 'Blank'} Profile Photo`,
        imgClass: "h-full w-full object-cover"
    }

    return (
        <header className="bg-white">
            <div className="flex justify-between items-center bg-white">
                <Link to={`/`} title={title} className="pl-4">
                    <SVGImage name="logo" width="100%" height="100%" viewBox="0 0 1450 400" className="h-12 object-cover" />
                </Link>
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
        </header>
    )
}

export default Header
