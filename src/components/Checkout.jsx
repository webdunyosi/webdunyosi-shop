import React, { useState } from "react"
import LocationSelector from "./LocationSelector"

const Checkout = ({ cartItems, total }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [showNotification, setShowNotification] = useState(false)

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

    const messageText = `Yangi Buyurtma:\n\nIsm: ${
      orderDetails.name
    }\nTelefon: ${orderDetails.phone}\nManzil: ${
      orderDetails.location
    }\n\nMahsulotlar:\n${orderDetails.items.join("\n")}\n\nJami: ${
      orderDetails.total
    }`

    const botToken = "8124325419:AAF3UKqcJD0mPbokuAo5al2VyjDv2SjaVUs"
    const chatId = "5414733748"

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
          alert("Buyurtma qabul qilindi!")
          setName("")
          setPhone("")
          setShowNotification(true)
          setTimeout(() => {
            setShowNotification(false)
          }, 3000)
          // Optionally clear cart and redirect
        } else {
          alert("Xato yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      })
      .catch((error) => {
        console.error("Error sending message to Telegram:", error)
        alert("Xato yuz berdi. Iltimos, qayta urinib ko'ring.")
      })

    console.log("Order submitted with location:", selectedLocation)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {showNotification && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-6 rounded-md shadow-lg">
          Buyurtmangiz qabul qilindi!
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {step === 1 ? (
              <LocationSelector onLocationSelect={handleLocationSelect} />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  Buyurtma ma'lumotlari
                </h2>
                <form onSubmit={handleSubmitOrder}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ism
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Manzil
                      </label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-md">
                        <p className="text-gray-700">
                          {selectedLocation
                            ? selectedLocation.name
                            : "Manzil tanlanmagan"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Manzilni o'zgartirish
                    </button>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.price} so'm</span>
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
