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
                    <div className={`flex border px-4 py-3 rounded relative bg-${toast.color}-100 border-${toast.color}-400 text-${toast.color}-700`} role="alert">
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