import * as React from "react"
import firebase from "gatsby-plugin-firebase"

const useFirestoreDoc = (collectionId, docId) => {
    console.log("parms:", collectionId, docId)

    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const [doc, setDoc] = React.useState(null)

    React.useEffect(() => {
        const unsubscribe = firebase.firestore().collection(collectionId).doc(docId).onSnapshot((snapshot) => {
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