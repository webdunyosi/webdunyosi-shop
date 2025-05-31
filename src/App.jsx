import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import products from "./data/products"
import ProductCard from "./components/ProductCard"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"
import Notification from "./components/Notification"

const App = () => {
  const [cart, setCart] = useState([])
  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
  })

  const handleBuy = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
    setNotification({
      message: `${product.name} savatchaga qo'shildi!`,
      isVisible: true,
    })
    setTimeout(() => {
      setNotification({ message: "", isVisible: false })
    }, 3000)
  }

  const handleIncrease = (product) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const handleDecrease = (product) => {
    setCart((prevItems) =>
      prevItems
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <Router>
      <div className="min-h-screen bg-black p-5 md:p-10 relative">
        <header className="flex justify-between items-center mb-10">
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
            <span className="hidden md:inline">Savatcha</span> (
            {cart.reduce((total, item) => total + item.quantity, 0)})
          </Link>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onBuy={handleBuy}
                  />
                ))}
              </div>
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cart}
                totalPrice={totalPrice}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cart}
                total={totalPrice}
                setNotification={setNotification}
              />
            }
          />
        </Routes>
        <Notification
          message={notification.message}
          isVisible={notification.isVisible}
        />
      </div>
    </Router>
  )
}

export default App
