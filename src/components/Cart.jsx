import React from "react"
import { Link } from "react-router-dom"

const Cart = ({ cartItems, totalPrice, onIncrease, onDecrease }) => {
  return (
    <div className="p-5 pb-24">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Savatcha</h2>

      {cartItems.length === 0 ? (
        <p className="dark:text-gray-300">Savat hozircha bo'sh.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold dark:text-white">{item.name}</h3>
                  <p className="dark:text-gray-300">
                    {item.price.toLocaleString()} so'm
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDecrease(item)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  –
                </button>
                <span className="font-semibold dark:text-white">
                  {item.quantity} dona
                </span>
                <button
                  onClick={() => onIncrease(item)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-indigo-600 dark:bg-indigo-700 text-white p-4 flex justify-between items-center shadow-lg">
        <span className="text-lg font-semibold">
          Jami: {totalPrice.toLocaleString()} so'm
        </span>
        {cartItems.length > 0 && (
          <Link
            to="/checkout"
            className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 duration-300 flex items-center gap-2"
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M10 12H7m3 4H7m6-4h.01M17 12h-3m3 4h-3m-6 4h.01M10 16H7m3 0h.01"
              />
            </svg>
            Buyurtma berish
          </Link>
        )}
      </div>
    </div>
  )
}

export default Cart
