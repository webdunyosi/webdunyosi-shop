import React from "react"

const ProductCard = ({ product, onBuy }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center transition transform hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-36 h-36 object-cover mb-4 rounded-lg"
      />
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-green-600 font-bold text-xl mb-4">
        {product.price.toLocaleString()} so‘m
      </p>
      <button
        onClick={() => onBuy(product)}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-full duration-300 shadow-md cursor-pointer active:scale-110"
      >
        🛒 Sotib olish
      </button>
    </div>
  )
}

export default ProductCard
