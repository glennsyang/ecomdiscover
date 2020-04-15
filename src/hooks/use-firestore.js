import React, { useEffect, useState } from "react"
import firebase from "gatsby-plugin-firebase"
import { isLoggedIn } from "../utils/auth"

const useFirestoreDoc = (docRef) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [doc, setDoc] = useState(null)

    useEffect(() => {
        const unsubscribe = docRef.onSnapshot((snapshot) => {
            setIsLoading(false)
            if (!snapshot.exists) return null
            setDoc({
                _id: snapshot.id,
                ...(snapshot.data()),
            })
        },
            (err) => {
                setError(err)
            },
        )

        return () => unsubscribe()
    }, [])

    return [doc, isLoading, error]
}

export default useFirestoreDoc