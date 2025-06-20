import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import products from "./data/products"
import ProductCard from "./components/ProductCard"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"
import Notification from "./components/Notification"
import Header from "./components/Header"
import ProductDetailView from "./components/ProductDetailView"

const App = () => {
  const [cart, setCart] = useState([])
  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
  })
  const [selectedProduct, setSelectedProduct] = useState(null)

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
        <Header
          cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-7">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onBuy={handleBuy}
                    onCardClick={setSelectedProduct}
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
        {selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
        <Notification
          message={notification.message}
          isVisible={notification.isVisible}
        />
      </div>
    </Router>
  )
}

export default App
