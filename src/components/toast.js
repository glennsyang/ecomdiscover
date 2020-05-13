import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

const Toast = props => {
    const { toastProps } = props

    const [toast, setToast] = useState(toastProps)
    const position = "bottom-right"
    const autoDelete = true
    const autoDeleteTime = 3000

    let classColor = ''
    if (toast) {
        if (toast.color === 'red') { classColor = "bg-red-100 border-red-400 text-red-700" }
        if (toast.color === 'green') { classColor = "bg-green-100 border-green-400 text-green-700" }
        if (toast.color === 'yellow') { classColor = "bg-yellow-100 border-yellow-400 text-yellow-700" }
    }

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
                    <div className={`border px-4 py-3 rounded relative ${classColor}`} role="alert">
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
