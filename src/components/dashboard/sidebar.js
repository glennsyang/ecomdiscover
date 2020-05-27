import React, { useState } from "react"
import { Link } from "gatsby"
import { FaPen, FaThList, FaBuilding, FaUser, FaAngleDoubleLeft, FaAngleDoubleRight, FaGlobeAmericas, FaQuestion } from "react-icons/fa"

const MenuChoice = (props) => {
    const { name, linkTo, icon, fold } = props
    let iconDisplay
    if (icon === "FaPen") { iconDisplay = <FaPen size={16} className="mr-2" /> }
    if (icon === "FaThList") { iconDisplay = <FaThList size={16} className="mr-2" /> }
    if (icon === "FaBuilding") { iconDisplay = <FaBuilding size={16} className="mr-2" /> }
    if (icon === "FaUser") { iconDisplay = <FaUser size={16} className="mr-2" /> }
    if (icon === "FaGlobeAmericas") { iconDisplay = <FaGlobeAmericas size={16} className="mr-2" /> }
    if (icon === "FaQuestion") { iconDisplay = <FaQuestion size={16} className="mr-2" /> }

    return (
        <div className={`text-base text-gray-500 hover:text-white ${fold ? 'ml-2 px-4 py-2 mt-4' : 'px-4 py-2 mx-6 mt-4'}`}>
            <Link to={linkTo} title={name} className="flex justify-between items-center">
                {fold
                    ? <span className="flex items-center">{iconDisplay}</span>
                    : <span className="flex items-center">{iconDisplay}{name}</span>
                }
            </Link>
        </div>
    )
}

function Sidebar() {
    const [showSidebar, setShowSidebar] = useState(false)
    const toggleSidebar = () => { setShowSidebar(!showSidebar) }

    const classShow = "md:w-16 lg:w-16"
    const classHide = "md:w-1/6 lg:w-1/6"
    const menuChoices = [
        { name: "Reviews", linkTo: "/dashboard/publishreviews", icon: "FaPen" },
        { name: "Companies", linkTo: "/dashboard/companies", icon: "FaBuilding" },
        { name: "Categories", linkTo: "/dashboard/categories", icon: "FaThList" },
        { name: "Users", linkTo: "/dashboard/users", icon: "FaUser" },
        { name: "Marketplaces", linkTo: "/dashboard/marketplaces", icon: "FaGlobeAmericas" },
        { name: "FAQ", linkTo: "/dashboard/faqs", icon: "FaQuestion" },
    ]

    return (
        <aside id="sidebar" className={`bg-gray-800 text-white w-1/2 ${showSidebar ? classShow : classHide} hidden md:block lg:block`}>
            <div className="flex flex-col">
                <div className="flex justify-between items-center text-gray-300 p-6">
                    {showSidebar ? '' : <Link to={`/dashboard`} className="text-lg font-bold antialiased">Dashboard</Link>}
                    <button type="button" className="outline-none focus:outline-none" onClick={toggleSidebar}>
                        {showSidebar ? <FaAngleDoubleRight size={16} /> : <FaAngleDoubleLeft size={16} />}
                    </button>
                </div>
                {menuChoices.map((menuChoice, id) => {
                    return (
                        <MenuChoice key={id} name={menuChoice.name} linkTo={menuChoice.linkTo} icon={menuChoice.icon} fold={showSidebar} />
                    )
                })}
            </div>
        </aside >
    )
}

export default Sidebar