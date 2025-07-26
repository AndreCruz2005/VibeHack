import React, { useState, useEffect } from 'react'
import Map from './components/Map'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import Header from './components/Header'
import ComparisonModal from './components/ComparisonModal'
import { Institution } from './types/institution'

function App() {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [loading, setLoading] = useState(false)
  const [isComparisonOpen, setIsComparisonOpen] = useState(false)

  // Detectar localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([latitude, longitude])
          console.log('📍 Localização detectada:', latitude, longitude)
        },
        (error) => {
          console.error('❌ Erro ao obter localização:', error)
          // Localização padrão (São Paulo)
          setUserLocation([-23.5505, -46.6333])
        }
      )
    } else {
      console.log('📍 Geolocalização não suportada')
      setUserLocation([-23.5505, -46.6333])
    }
  }, [])

  // Função para lidar com resultados de busca
  const handleSearchResults = (results: Institution[]) => {
    console.log('📊 Resultados da busca:', results.length)
    setInstitutions(results)
    setSelectedInstitution(null) // Limpar seleção ao fazer nova busca
  }

  // Função para selecionar instituição
  const handleSelectInstitution = (institution: Institution | null) => {
    setSelectedInstitution(institution)
  }

  // Função para abrir modal de comparação
  const handleOpenComparison = () => {
    setIsComparisonOpen(true)
  }

  // Função para fechar modal de comparação
  const handleCloseComparison = () => {
    setIsComparisonOpen(false)
  }

  return (
    <div className="min-h-screen bg-[color:var(--main-bg)] text-[color:var(--main-text)]">
      <div className="flex h-screen">
        {/* Área principal com mapa */}
        <div className="flex-1 flex flex-col">
          {/* Barra de busca */}
          <SearchBar 
            onSearch={handleSearchResults}
            userLocation={userLocation}
            loading={loading}
          />
          
          {/* Mapa */}
          <div className="flex-1 relative">
            <Map
              institutions={institutions}
              userLocation={userLocation}
              selectedInstitution={selectedInstitution}
              onSelectInstitution={handleSelectInstitution}
            />
          </div>
          
          {/* Header */}
          <Header userLocation={userLocation} />
        </div>
        
        {/* Sidebar */}
        <Sidebar
          institutions={institutions}
          selectedInstitution={selectedInstitution}
          onSelectInstitution={handleSelectInstitution}
          userLocation={userLocation}
          loading={loading}
          onOpenComparison={handleOpenComparison}
        />
      </div>

      {/* Modal de Comparação Independente */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={handleCloseComparison}
        institutions={institutions}
        userLocation={userLocation}
      />
      
    </div>
  )
}

export default App 