import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Custom icons for different locations
const officeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const storeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const LocationSelector = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [address, setAddress] = useState("")

  // Store locations in Navoiy
  const officeLocation = [40.102535, 65.3859922] // Codevent office
  const storeLocation = [40.0897718, 65.3813771] // Magazin U Sirocha

  const handleLocationClick = (location, name, type) => {
    const locationData = { lat: location[0], lng: location[1] }
    setSelectedLocation(locationData)
    setAddress(name)
    onLocationSelect({
      ...locationData,
      name,
      type,
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-6 border border-gray-700 text-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Yetkazib berish manzilini tanlang
          </h2>
          {selectedLocation && (
            <span className="px-4 py-2 bg-lime-500 text-black rounded-full text-sm font-medium">
              Manzil tanlandi
            </span>
          )}
        </div>

        <div className="h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden mb-6 border-2 border-gray-700 shadow-lg">
          <MapContainer
            center={[40.0961534, 65.38368465]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            className="z-10"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={officeLocation}
              icon={officeIcon}
              eventHandlers={{
                click: () =>
                  handleLocationClick(officeLocation, "Codevent", "office"),
              }}
            >
              <Popup>
                <div className="text-center p-2">
                  <h3 className="font-bold text-lg text-gray-800">Codevent</h3>
                  <p className="text-sm text-gray-600">Navoiy shahri</p>
                  <p className="text-sm text-gray-600 mt-1">Bizning ofisimiz</p>
                  <button
                    onClick={() =>
                      handleLocationClick(officeLocation, "Codevent", "office")
                    }
                    className="mt-2 px-4 py-1 bg-lime-500 text-black rounded-lg text-sm hover:bg-lime-600 transition-colors"
                  >
                    Tanlash
                  </button>
                </div>
              </Popup>
            </Marker>
            <Marker
              position={storeLocation}
              icon={storeIcon}
              eventHandlers={{
                click: () =>
                  handleLocationClick(
                    storeLocation,
                    "Magazin U Sirocha",
                    "store"
                  ),
              }}
            >
              <Popup>
                <div className="text-center p-2">
                  <h3 className="font-bold text-lg text-gray-800">
                    Magazin U Sirocha
                  </h3>
                  <p className="text-sm text-gray-600">Navoiy shahri</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Bizning do'konimiz
                  </p>
                  <button
                    onClick={() =>
                      handleLocationClick(
                        storeLocation,
                        "Magazin U Sirocha",
                        "store"
                      )
                    }
                    className="mt-2 px-4 py-1 bg-lime-500 text-black rounded-lg text-sm hover:bg-lime-600 transition-colors"
                  >
                    Tanlash
                  </button>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {selectedLocation && (
          <div className="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 font-medium">
                  Tanlangan manzil: {address}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {selectedLocation.type === "office" ? "Ofis" : "Do'kon"}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedLocation(null)
                  setAddress("")
                  onLocationSelect(null)
                }}
                className="text-red-500 hover:text-red-600 text-sm font-medium"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
          <h3 className="font-semibold text-white mb-3">
            Manzillar haqida ma'lumot:
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <p className="text-sm text-white">
                Codevent ofisi - Navoiy shahri
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <p className="text-sm text-white">
                Magazin U Sirocha - Navoiy shahri
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationSelector
