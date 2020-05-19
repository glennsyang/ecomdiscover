import React from "react"
import { Link } from "gatsby"
import { FaAngleRight, FaPen, FaThList, FaBuilding, FaUser } from "react-icons/fa"

const MenuChoice = (props) => {
    const { name, linkTo, icon, fold } = props
    let iconDisplay
    if (icon === "FaPen") { iconDisplay = <FaPen size={16} className="mr-2" /> }
    if (icon === "FaThList") { iconDisplay = <FaThList size={16} className="mr-2" /> }
    if (icon === "FaBuilding") { iconDisplay = <FaBuilding size={16} className="mr-2" /> }
    if (icon === "FaUser") { iconDisplay = <FaUser size={16} className="mr-2" /> }

    return (
        <div className="px-2 py-4 text-sm text-gray-500 hover:text-white">
            <Link to={linkTo} title={name} className="flex justify-between items-center">
                {fold
                    ? <span className="flex items-center">{iconDisplay}</span>
                    : <span className="flex items-center">{iconDisplay}{name}</span>
                }
            </Link>
        </div >
    )
}

function Sidebar(props) {
    const { fold } = props
    const classFold = fold ? 'lg:w-16' : 'lg:w-1/6'
    const menuChoices = [
        { name: "Reviews", linkTo: "/dashboard/publishreviews", icon: "FaPen" },
        { name: "Categories", linkTo: "/dashboard/categories", icon: "FaThList" },
        { name: "Companies", linkTo: "/dashboard/companies", icon: "FaBuilding" },
        { name: "Users", linkTo: "/dashboard/users", icon: "FaUser" },
    ]

    return (
        <aside id="sidebar" className={`bg-gray-800 text-white w-1/2 md:w-1/6 ${classFold} hidden md:block lg:block`}>
            <div className="flex flex-col ml-6 mt-8">
                {
                    menuChoices.map((menuChoice, id) => {
                        return (<MenuChoice key={id} name={menuChoice.name} linkTo={menuChoice.linkTo} icon={menuChoice.icon} fold={fold} />)
                    })
                }
            </div>
        </aside >
    )
}

export default Sidebar