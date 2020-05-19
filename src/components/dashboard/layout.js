import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import firebase from "gatsby-plugin-firebase"
import SEO from "../seo"
import Header from "../dashboard/header"
import Footer from "../dashboard/footer"
import Sidebar from "./sidebar"
import { useSiteMetadata } from "../../hooks/use-site-metadata"
import { getUser } from "../../utils/auth"

function Layout({ children }) {
    const { title } = useSiteMetadata()
    const { uid } = getUser()
    const [userInfo, setUserInfo] = useState(null)
    const [showSidebar, setShowSidebar] = useState(true)

    const toggleSidebar = () => { setShowSidebar(!showSidebar) }

    useEffect(() => {
        const unsubscribeUser = firebase.firestore().collection('users').doc(uid).onSnapshot(snapshotUser => {
            setUserInfo({
                name: snapshotUser.data().displayName,
                photo: snapshotUser.data().photoURL,
                role: snapshotUser.data().role,
            })
            //setIsLoading(false)
        })
        return () => unsubscribeUser()
    }, [uid])

    return (
        <div className="mx-auto bg-white">
            <SEO
                title="Dashboard"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <div className="min-h-screen flex flex-col">
                <Header title={title} userInfo={userInfo} onToggle={toggleSidebar} />
                <div className="flex flex-1">
                    {showSidebar ? <Sidebar fold={false} /> : <Sidebar fold={true} />}
                    <main className="bg-gray-100 flex-1 p-4 overflow-hidden">{children}</main>
                </div>
                <Footer title={title} />
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;