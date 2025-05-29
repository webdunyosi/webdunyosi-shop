import React, { useState, useEffect } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet"
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

// Custom icon for the store location
const storeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng)
    },
  })

  return position ? <Marker position={position} /> : null
}

const LocationSelector = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null)
  const [address, setAddress] = useState("")

  // Store location coordinates in Navoiy
  const storeLocation = [40.102535, 65.3859922] // Navoiy coordinates

  useEffect(() => {
    if (position) {
      // Here you would typically use a geocoding service to get the address
      // For now, we'll just use the coordinates
      setAddress(`${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`)
      onLocationSelect(position)
    }
  }, [position, onLocationSelect])

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Yetkazib berish manzilini tanlang
        </h2>
        <div className="h-[500px] w-full rounded-lg overflow-hidden mb-4 border-2 border-gray-200">
          <MapContainer
            center={storeLocation}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
            className="z-10"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={storeLocation} icon={storeIcon}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-lg">Codevent</h3>
                  <p className="text-sm text-gray-600">Navoiy shahri</p>
                  <p className="text-sm text-gray-600 mt-1">Bizning ofisimiz</p>
                </div>
              </Popup>
            </Marker>
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>
        {address && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              <span className="font-semibold">Tanlangan manzil:</span> {address}
            </p>
          </div>
        )}
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Xaritadan yetkazib berish manzilini tanlang yoki koordinatalarni
            kiriting
          </p>
          <p className="text-sm text-red-600 mt-2">
            Qizil belgi - bizning ofisimiz joylashgan manzil (Navoiy shahri)
          </p>
        </div>
      </div>
    </div>
  )
}

export default LocationSelector
