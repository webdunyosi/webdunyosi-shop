import React from "react"
import { Link } from "react-router-dom"

const Header = ({ cartItemCount }) => {
  return (
    <header className="flex justify-between items-center mb-7 md:mb-10">
      <h1 className="text-2xl md:text-4xl font-extrabold text-lime-500">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="webdunyosi-shop.png"
            alt="Webdunyosi Shop Logo"
            className="h-10 w-auto object-contain rounded-xl"
          />
          <span className="text-2xl md:text-4xl font-extrabold text-lime-500">
            Webdunyosi Shop
          </span>
        </Link>
      </h1>
      <Link
        to="/cart"
        className="bg-lime-500 text-black px-4 py-2 rounded-lg hover:bg-lime-600 duration-300 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="hidden md:inline">Savatcha</span> ({cartItemCount})
      </Link>
    </header>
  )
}

export default Header
