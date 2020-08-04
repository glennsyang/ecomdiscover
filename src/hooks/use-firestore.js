import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"

function useFirebaseFirestore(collection, autoLoadAll) {
    const [queryResults, setQueryResults] = useState(null);
    const [queryLoaded, setQueryLoaded] = useState(false);
    const [queryError, setQueryError] = useState(false);
    let unsubscribeFromFirebase; // this will be set to a function which allows us to terminate the firebase subscription.

    const loadAllDocuments = () => {
        // collection.onSnapshot() returns a QuerySnapshot object:
        // We assign the promise request to a variable, which will end up being a function
        // that can be called to unsubscribe from changes.
        unsubscribeFromFirebase = firebase.firestore().collection(collection).onSnapshot(snapshot => {
            console.log("collection:", collection, snapshot)
            let docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setQueryResults(docs);
            setQueryLoaded(true);
        });
    }

    useEffect(() => {
        console.log({ autoLoadAll })
        if (autoLoadAll) {
            loadAllDocuments();
        }
        return () => {
            unsubscribeFromFirebase();
        }
    }, []); // We only want the fetch to occur on the initial mount of the component.
    return [
        queryResults,
        queryLoaded,
        queryError
    ]
}

export default useFirebaseFirestore