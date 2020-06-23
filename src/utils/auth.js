import firebase from "gatsby-plugin-firebase"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
    isBrowser() && window.localStorage.getItem("user")
        ? JSON.parse(window.localStorage.getItem("user"))
        : {}

export const setUser = user =>
    isBrowser() && window.localStorage.setItem("user", JSON.stringify(user))

export const isLoggedIn = () => {
    const user = getUser()
    return user === null ? false : !!user.email
}

export const isBlocked = async () => {
    if (isLoggedIn()) {
        const user = getUser()
        const documentReference = firebase.firestore().collection('users').doc(user.uid)
        const result = await documentReference.get()
        const data = result.data()
        //console.log("data:", data)
        return data.active
    } else { return false }
}

export const logout = (firebase) => {
    return new Promise(resolve => {
        firebase.auth().signOut().then(() => {
            setUser({});
            resolve();
        });
    })
}