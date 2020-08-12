import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import firebase from "gatsby-plugin-firebase"
import SEO from "../seo"
import Header from "../dashboard/header"
import Footer from "../dashboard/footer"
import Sidebar from "./sidebar"
import { useSiteMetadata } from "../../hooks/useSiteMetadata"
import { getUser } from "../../utils/auth"

function Layout({ children }) {
    const { title } = useSiteMetadata()
    const { uid } = getUser()
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const unsubscribeUser = firebase.firestore().collection('users').doc(uid).onSnapshot(snapshotUser => {
            setUserInfo({
                name: snapshotUser.data().displayName,
                photo: snapshotUser.data().photoURL,
                role: snapshotUser.data().role,
            })
        })
        return () => unsubscribeUser()
    }, [uid])

    return (
        <div className="mx-auto bg-white">
            <SEO
                title="Dashboard"
                keywords={[`amazon`, `seller`, `tools`, `FBA`]}
            />
            <div className="min-h-screen flex flex-row">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header title={title} userInfo={userInfo} />
                    <main className="flex-1 bg-gray-100 p-4 overflow-hidden">{children}</main>
                    <Footer title={title} />
                </div>
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout