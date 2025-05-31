import React, { useState } from "react"
import LocationSelector from "./LocationSelector"

const Checkout = ({ cartItems, total, setNotification }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    setStep(2)
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()

    const orderDetails = {
      name: name,
      phone: phone,
      location: selectedLocation ? selectedLocation.name : "Manzil tanlanmagan",
      items: cartItems.map((item) => `${item.name} - ${item.price} so'm`),
      total: `${total} so'm`,
    }

    const messageText = `Yangi Buyurtma:\n\n👤 Ism: ${
      orderDetails.name
    }\n📞 Telefon: ${orderDetails.phone}\n📍 Manzil: ${
      orderDetails.location
    }\n\n📦 Mahsulotlar:\n${orderDetails.items.join("\n")}\n\n💰 Jami: ${
      orderDetails.total
    }`

    const botToken = "8124325419:AAF3UKqcJD0mPbokuAo5al2VyjDv2SjaVUs"
    const chatId = "-1002610359694"

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Telegram API response:", data)
        if (data.ok) {
          setName("")
          setPhone("")
          setNotification({
            message: "Buyurtma qabul qilindi!",
            isVisible: true,
          })
          // Optionally clear cart and redirect
        } else {
          setNotification({
            message: "Xato yuz berdi. Iltimos, qayta urinib ko'ring.",
            isVisible: true,
          })
        }
      })
      .catch((error) => {
        console.error("Error sending message to Telegram:", error)
        setNotification({
          message: "Xato yuz berdi. Iltimos, qayta urinib ko'ring.",
          isVisible: true,
        })
      })

    console.log("Order submitted with location:", selectedLocation)
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {step === 1 ? (
              <LocationSelector onLocationSelect={handleLocationSelect} />
            ) : (
              <div className="bg-gray-900 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 text-white">
                  Buyurtma ma'lumotlari
                </h2>
                <form onSubmit={handleSubmitOrder}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Ism
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Manzil
                      </label>
                      <div className="mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                        <p className="text-gray-300">
                          {selectedLocation
                            ? selectedLocation.name
                            : "Manzil tanlanmagan"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-lime-500 hover:text-lime-400"
                    >
                      Manzilni o'zgartirish
                    </button>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full bg-lime-500 text-black py-2 px-4 rounded-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                    >
                      Buyurtmani tasdiqlash
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-96">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Buyurtma ma'lumotlari
              </h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <p className="text-gray-600 text-sm">
                          Soni: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span>{item.price.toLocaleString()} so'm</span>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Jami</span>
                    <span>{total} so'm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
