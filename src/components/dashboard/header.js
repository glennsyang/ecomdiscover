import React, { useState } from "react"

function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="bg-nav">
            <div className="flex justify-between">
                <div className="p-1 mx-3 inline-flex">
                    <h1 className="text-white">Logo</h1>
                    <i className="fas fa-bars p-3 text-white" onclick="sidebarToggle()"></i>
                </div>
                <div className="p-1 flex flex-row">
                    <a href="https://github.com/tailwindadmin/admin" className="text-white p-2 mr-2 no-underline hidden md:block lg:block">Github</a>

                    <img className="inline-block h-8 w-8 rounded-full" src="https://avatars0.githubusercontent.com/u/4323180?s=460v=4" alt="" />
                    <a href="#" onclick="profileToggle()" className="text-white p-2 no-underline hidden md:block lg:block">Adam Wathan</a>
                    <div id="ProfileDropDown" className="rounded hidden shadow-md bg-white absolute pin-t mt-12 mr-1 pin-r">
                        <ul className="list-reset">
                            <li><a href="#" className="no-underline px-4 py-2 block text-black hover:bg-grey-light">My account</a></li>
                            <li><a href="#" className="no-underline px-4 py-2 block text-black hover:bg-grey-light">Notifications</a></li>
                            <li><hr className="border-t mx-2 border-grey-ligght" /></li>
                            <li><a href="#" className="no-underline px-4 py-2 block text-black hover:bg-grey-light">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
