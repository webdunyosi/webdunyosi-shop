import React from "react"
import { Link } from "react-router-dom"

const Cart = ({ cartItems, totalPrice, onIncrease, onDecrease }) => {
  return (
    <div className="p-5 pb-24">
      <Link
        to="/"
        className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 block mb-5 text-center"
      >
        🛍 Webdunyosi Shop
      </Link>

      <h2 className="text-xl font-semibold mb-4">Savatcha</h2>

      {cartItems.length === 0 ? (
        <p>Savat hozircha bo'sh.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>{item.price.toLocaleString()} so'm</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDecrease(item)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  –
                </button>
                <span className="font-semibold">{item.quantity} dona</span>
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

      <div className="fixed bottom-0 left-0 w-full bg-indigo-600 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">
            Jami: {totalPrice.toLocaleString()} so'm
          </span>
          <Link to="/" className="text-white hover:text-gray-200 duration-300">
            🏠 Asosiy sahifaga qaytish
          </Link>
        </div>
        {cartItems.length > 0 && (
          <Link
            to="/checkout"
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 duration-300"
          >
            Buyurtma berish
          </Link>
        )}
      </div>
    </div>
  )
}

export default Cart
