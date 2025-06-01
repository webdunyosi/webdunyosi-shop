import React, { useState } from "react"
import {
  XMarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline"

const ProductDetailView = ({ product, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)

  if (!product) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-4xl w-full relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors cursor-pointer p-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ease-in-out"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Cover and Main Info */}
          <div className="flex-shrink-0">
            <div className="relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-64 h-80 object-cover rounded-lg shadow-lg transform transition-transform group-hover:scale-105"
              />
              <button
                onClick={() => setShowGallery(true)}
                className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold rounded-lg cursor-pointer"
              >
                Kitob sahifalarini ko'rish
              </button>
            </div>
          </div>

          {/* Book Details */}
          <div className="flex-grow">
            <h2 className="text-3xl font-bold mb-3 text-white">
              {product.name}
            </h2>
            <p className="text-gray-300 text-lg mb-4">{product.author}</p>
            <p className="text-lime-500 font-bold text-2xl mb-6">
              {product.price.toLocaleString()} so'm
            </p>

            <div className="text-gray-300">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-semibold text-gray-400">ISBN:</span>
                <span>Placeholder ISBN</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-semibold text-gray-400">Yozuvi:</span>
                <span>Placeholder Yozuvi</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-semibold text-gray-400">Yili:</span>
                <span>Placeholder Yili</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-semibold text-gray-400">Tili:</span>
                <span>Placeholder Tili</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-semibold text-gray-400">
                  Betlar soni:
                </span>
                <span>Placeholder Betlar soni</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-semibold text-gray-400">Nashriyot:</span>
                <span>Placeholder Nashriyot</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-semibold text-gray-400">Muqova:</span>
                <span>Placeholder Muqova</span>
              </div>
              {/* Assuming 'Tarjimon' also exists in your product data */}
              {product.translator && (
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="font-semibold text-gray-400">Tarjimon:</span>
                  <span>Placeholder Tarjimon</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Book Pages Gallery Modal */}
        {showGallery && (
          <div className="fixed inset-0 bg-black bg-opacity-95 bg-gradient-to-br from-gray-900 to-black backdrop-blur-md flex items-center justify-center z-50">
            <div className="max-w-4xl w-full p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-xl font-semibold drop-shadow">
                  Sahifa {currentPage + 1} / {product.bookPages.length}
                </h3>
                <button
                  onClick={() => setShowGallery(false)}
                  className="text-gray-400 hover:text-white text-3xl transition-colors cursor-pointer p-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ease-in-out"
                >
                  <XMarkIcon className="h-8 w-8" />
                </button>
              </div>

              <div className="relative">
                <img
                  src={product.bookPages[currentPage]?.image}
                  alt={`Page ${currentPage + 1}`}
                  className="w-full h-[80vh] object-contain shadow-xl rounded-lg"
                />

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentPage === 0}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full disabled:opacity-50 cursor-pointer hover:scale-110 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ease-in-out"
                >
                  <ArrowLeftIcon className="h-6 w-6" />
                </button>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(product.bookPages.length - 1, prev + 1)
                    )
                  }
                  disabled={currentPage === product.bookPages.length - 1}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full disabled:opacity-50 cursor-pointer hover:scale-110 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ease-in-out"
                >
                  <ArrowRightIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {product.bookPages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full ${
                      currentPage === index ? "bg-white" : "bg-gray-600"
                    } cursor-pointer`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailView
