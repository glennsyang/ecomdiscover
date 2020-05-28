//import { get, set } from 'lodash'

const getReference = async documentReference => {
    const res = await documentReference.get()
    const data = res.data()

    if (data && documentReference.id) {
        data.id = documentReference.id
    }

    return data
}

const hydrate = async (document, paths = []) => Promise.all(
    paths.map(async path => {
        //const documentReference = document[path]
        const documentField = document[path]
        if (documentField.constructor.name === 'Array') {
            for (let i = 0; i < documentField.length; i++) {
                const documentReference = documentField[i];
                if (!documentReference || !documentReference.path) {
                    return console.warn(
                        `Error hydrating documentReference for path "${path}": Not found or invalid reference`
                    )
                }
                const result = await getReference(documentReference)
                documentField[i] = result;
            }
        }
        else {
            const documentReference = documentField;
            if (!documentReference || !documentReference.path) {
                return console.warn(
                    `Error hydrating documentReference for path "${path}": Not found or invalid reference`
                )
            }

            const result = await getReference(documentReference)
            document[path] = result
        }
    })
)

export { hydrate }