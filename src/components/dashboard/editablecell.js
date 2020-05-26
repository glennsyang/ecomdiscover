import React, { useState, useEffect } from "react"

const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateData, // This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} className="w-full whitespace-normal bg-white text-gray-600 text-sm antialiased font-light focus:outline-none focus:shadow-outline rounded leading-normal py-1" />
}

export default EditableCell