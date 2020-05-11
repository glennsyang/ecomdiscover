import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

const Toast = props => {
    const { toastProps } = props

    const [toast, setToast] = useState(toastProps)
    const position = "bottom-right"
    const autoDelete = true
    const autoDeleteTime = 3000

    useEffect(() => {
        setToast(toastProps)
    }, [toastProps]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete) { deleteToast() }
        }, autoDeleteTime)

        return () => clearInterval(interval)
    }, [toastProps, autoDelete, autoDeleteTime, toast])

    const deleteToast = () => { setToast() }

    if (!toast) { return null }
    else {
        return (
            <>
                <div className={`notification-container ${position}`}>
                    <div className={`border px-4 py-3 rounded relative bg-${toast.color}-100 border-${toast.color}-400 text-${toast.color}-700`} role="alert">
                        <span className="inline-block font-bold align-middle mr-2">{toast.title}</span>
                        <span className="inline-block align-middle mr-6">{toast.description}</span>
                        <button className="absolute bg-transparent right-0 top-0 mt-4 mr-2 outline-none focus:outline-none" name="delete" onClick={deleteToast}>
                            <FaTimes size={18} />
                        </button>
                    </div>
                </div>
            </>
        )
    }
}
export default Toast
