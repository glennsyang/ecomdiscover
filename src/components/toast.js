import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

const Toast = props => {
    const { toastProps, position, autoDelete, autoDeleteTime } = props
    const [toast, setToast] = useState(toastProps)

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
                    <div className={`flex border px-4 py-3 rounded relative ${toast.className}`} role="alert">
                        <strong className="font-bold">{toast.title}</strong>
                        <span className="ml-2">{toast.description}</span>
                        <button className="ml-2" name="delete" onClick={deleteToast}>
                            <FaTimes size={18} />
                        </button>
                    </div>
                </div>
            </>
        )
    }
}
export default Toast