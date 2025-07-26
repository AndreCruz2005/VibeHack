import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Institution } from '../types/institution'

interface MapProps {
  institutions: Institution[]
  userLocation: [number, number] | null
  selectedInstitution: Institution | null
  onSelectInstitution: (institution: Institution | null) => void
}

// Componente para centralizar o mapa na localização do usuário
function MapCenter({ userLocation }: { userLocation: [number, number] | null }) {
  const map = useMap()
  
  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 13)
    }
  }, [userLocation, map])
  
  return null
}

const Map: React.FC<MapProps> = ({ institutions, userLocation, selectedInstitution, onSelectInstitution }) => {
  const mapRef = useRef<L.Map | null>(null)

  // Ícones personalizados para diferentes tipos de instituição
  const getIcon = (type: string) => {
    const iconUrl = type === 'universidade' 
      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'
      : type === 'escola_tecnica'
      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
      : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'

    return L.icon({
      iconUrl,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={userLocation || [-8.0476, -34.9470]} // Recife
        zoom={13}
        className="w-full h-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapCenter userLocation={userLocation} />
        
        {/* Marcador da localização do usuário */}
        {userLocation && (
          <Marker 
            position={userLocation}
            icon={L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })}
          >
            <Popup>
              <div className="text-center">
                <strong className="text-[color:var(--primary-color)]">Sua Localização</strong>
                <br />
                <small className="text-[color:var(--main-text)]/70">
                  {userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}
                </small>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Marcadores das instituições */}
        {institutions.map((institution) => (
          <Marker
            key={institution.id}
            position={institution.coordinates}
            icon={getIcon(institution.type)}
            eventHandlers={{
              click: () => onSelectInstitution(institution)
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div className="font-bold text-[color:var(--main-text)] mb-2">
                  {institution.name}
                </div>
                <div className="text-sm text-[color:var(--main-text)]/70 mb-2">
                  {institution.address}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[color:var(--main-text)]/70">
                    {institution.type.replace('_', ' ')}
                  </span>
                  <span className="font-bold text-[color:var(--main-text)]">
                    {institution.costs.mensalidade === 0 ? 'GRÁTIS' : `R$ ${institution.costs.mensalidade}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-[color:var(--main-text)]/70">Avaliação:</span>
                  <div className="flex items-center">
                    <span className="text-[color:var(--warning-color)] mr-1">★</span>
                    <span className="font-bold">{institution.rating}/5</span>
                  </div>
                </div>
                {institution.enadeScore && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[color:var(--main-text)]/70">ENADE:</span>
                    <span className="font-bold text-[color:var(--accent-color)]">{institution.enadeScore}/5</span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map 