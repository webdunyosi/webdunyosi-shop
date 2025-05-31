import React, { useEffect, useState } from "react"

const Notification = ({ message, isVisible }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let timer
    if (isVisible && message) {
      setShow(true)
      timer = setTimeout(() => {
        setShow(false)
      }, 3000) // Hide after 3 seconds
    } else {
      setShow(false)
    }

    return () => clearTimeout(timer) // Clear timer on cleanup or when dependencies change
  }, [isVisible, message]) // Depend on isVisible and message

  // Use different classes for showing/hiding with transition
  const notificationClasses = `
    fixed bottom-4 right-4
    bg-green-500 text-white
    px-6 py-3 rounded-lg shadow-lg
    transition-all duration-500 ease-in-out
    ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}
    ${isVisible && message ? "pointer-events-auto" : "pointer-events-none"}
  `

  // Render only if isVisible is true and message is not empty, or if show is true (during transition)
  if (!((isVisible && message) || show)) return null

  return (
    <div className={notificationClasses}>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {message}
      </div>
    </div>
  )
}

export default Notification
