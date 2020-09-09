import { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"

const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        // References
        const storageRef = firebase.storage().ref().child(`company-images/${file.name}`)

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
            console.log("percent:", percentage)
            setProgress(percentage)
        }, (err) => {
            setError(err)
        }, async () => {
            const url = await storageRef.getDownloadURL()
            setUrl(url)
        })
    }, [file])

    return { progress, url, error }

}

export default useStorage