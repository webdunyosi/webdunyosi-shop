import React from "react"
import { Link } from "react-router-dom"

const Cart = ({ cartItems, totalPrice, onIncrease, onDecrease }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Savatcha</h2>

      {cartItems.length === 0 ? (
        <p>Savat hozircha bo'sh.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-900 text-white p-1.5 md:p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-400">
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
                <span className="font-semibold">{item.quantity}</span>
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

      <div className="fixed bottom-0 left-0 w-full bg-lime-500 text-black p-1.5 md:p-4 flex justify-between items-center shadow-lg">
        <span className="text-lg font-semibold">
          Jami: {totalPrice.toLocaleString()} so'm
        </span>
        {cartItems.length > 0 && (
          <Link
            to="/checkout"
            className="bg-black text-lime-500 px-3 md:px-8 py-1.5 md:py-3 rounded-xl font-semibold hover:bg-gray-800 duration-300 flex items-center gap-2"
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
