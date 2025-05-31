import React from "react"

const ProductDetailView = ({ product, onClose }) => {
  if (!product) {
    return null // Or a loading spinner, etc.
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
        <div className="flex">
          <img
            src={product.image}
            alt={product.name}
            className="w-48 h-64 object-cover rounded-lg mr-8"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">
              {product.name}
            </h2>
            <p className="text-gray-400 mb-4">{product.author}</p>
            <p className="text-lime-500 font-bold text-xl mb-4">
              {product.price.toLocaleString()} so'm
            </p>
            {/* Add more details here based on your product data structure */}
            <div className="text-gray-300 text-sm">
              <p>
                <strong>ISBN:</strong> {product.isbn}
              </p>
              <p>
                <strong>Yozuvi:</strong> {product.script}
              </p>
              <p>
                <strong>Yili:</strong> {product.year}
              </p>
              <p>
                <strong>Tili:</strong> {product.language}
              </p>
              <p>
                <strong>Betlar soni:</strong> {product.pages}
              </p>
              <p>
                <strong>Nashriyot:</strong> {product.publisher}
              </p>
              <p>
                <strong>Muqova:</strong> {product.cover}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailView
