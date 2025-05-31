import React from "react"

const ProductCard = ({ product, onBuy }) => {
  return (
    <div className="bg-gray-900 shadow-lg rounded-2xl p-5 flex flex-col items-center transition transform hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-36 h-36 object-cover mb-4 rounded-lg"
      />
      <h2 className="text-lg font-semibold mb-2 text-white">{product.name}</h2>
      <p className="text-lime-500 font-bold text-xl mb-4">
        {product.price.toLocaleString()} so'm
      </p>
      <button
        onClick={() => onBuy(product)}
        className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-black px-6 py-2 rounded-full duration-300 shadow-md cursor-pointer active:scale-110"
      >
        🛒 Sotib olish
      </button>
    </div>
  )
}

export default ProductCard
