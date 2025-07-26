import React, { useState, useEffect } from 'react'
import { 
  Search, 
  MapPin, 
  GraduationCap, 
  BookOpen, 
  Building2, 
  Users, 
  Clock, 
  Target,
  Scale,
  TrendingUp,
  Award,
  Zap,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  DollarSign,
  Route,
  Lightbulb
} from 'lucide-react'
import { Institution } from '../types/institution'
import { eMecScraper } from '../utils/scraper'
import ComparisonModal from './ComparisonModal'

interface SearchBarProps {
  onSearch: (results: Institution[]) => void
  userLocation: [number, number] | null
  loading: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, userLocation, loading }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState<'course' | 'institution'>('course')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isComparisonOpen, setIsComparisonOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<Institution[]>([])

  // Cursos populares para busca rápida
  const popularCourses = [
    'Medicina', 'Direito', 'Engenharia', 'Administração', 'Pedagogia',
    'Enfermagem', 'Fisioterapia', 'Psicologia', 'Contabilidade', 'Sistemas'
  ]

  // Tipos de instituições com ícones
  const institutionTypes = [
    { type: 'universidade', label: 'UNIVERSIDADES', icon: GraduationCap, color: 'text-blue-500' },
    { type: 'faculdade', label: 'FACULDADES', icon: Building2, color: 'text-green-500' },
    { type: 'escola_tecnica', label: 'ESCOLAS TÉCNICAS', icon: BookOpen, color: 'text-orange-500' }
  ]

  // Filtros para periferia
  const peripheralFilters = [
    { label: 'GRATUITAS', icon: DollarSign, color: 'text-green-500', filter: 'gratuitas' },
    { label: 'BOLSAS', icon: Award, color: 'text-yellow-500', filter: 'bolsas' },
    { label: 'ORIENTAÇÃO', icon: Users, color: 'text-blue-500', filter: 'orientacao' },
    { label: 'TRANSPORTE', icon: Route, color: 'text-purple-500', filter: 'transporte' }
  ]

  // Buscar instituições próximas
  const handleNearbySearch = async () => {
    if (!userLocation) return
    
    try {
      const results = await eMecScraper.searchNearby(userLocation, 10)
      setSearchResults(results as Institution[])
      onSearch(results as Institution[])
      addToRecentSearches('Instituições Próximas')
    } catch (error) {
      console.error('Erro ao buscar instituições próximas:', error)
    }
  }

  // Buscar por tipo de instituição
  const handleTypeSearch = async (type: string) => {
    try {
      const results = await eMecScraper.searchByType(type, userLocation || undefined)
      setSearchResults(results as Institution[])
      onSearch(results as Institution[])
      addToRecentSearches(`${type.charAt(0).toUpperCase() + type.slice(1)}`)
    } catch (error) {
      console.error('Erro ao buscar por tipo:', error)
    }
  }

  // Buscar por filtro de periferia
  const handlePeripheralFilter = async (filter: string) => {
    try {
      let results: Institution[]
      
      switch (filter) {
        case 'gratuitas':
          results = await eMecScraper.searchInstitutions(userLocation || undefined)
          results = results.filter(inst => inst.costs.mensalidade === 0)
          break
        case 'bolsas':
          results = await eMecScraper.searchInstitutions(userLocation || undefined)
          results = results.filter(inst => 
            inst.academicInfo.scholarships.some(sch => 
              sch.toLowerCase().includes('prouni') || 
              sch.toLowerCase().includes('fies') || 
              sch.toLowerCase().includes('bolsa')
            )
          )
          break
        case 'orientacao':
          results = await eMecScraper.searchInstitutions(userLocation || undefined)
          results = results.filter(inst => inst.academicInfo.careerGuidance)
          break
        case 'transporte':
          results = await eMecScraper.searchInstitutions(userLocation || undefined)
          results = results.filter(inst => inst.academicInfo.freeTransport)
          break
        default:
          results = await eMecScraper.searchInstitutions(userLocation || undefined)
      }
      
      setSearchResults(results)
      onSearch(results)
      addToRecentSearches(filter.charAt(0).toUpperCase() + filter.slice(1))
    } catch (error) {
      console.error('Erro ao buscar por filtro:', error)
    }
  }

  // Buscar por curso
  const handleCourseSearch = async (courseName: string) => {
    try {
      const results = await eMecScraper.searchByCourse(courseName, userLocation || undefined)
      setSearchResults(results as Institution[])
      onSearch(results as Institution[])
      addToRecentSearches(courseName)
    } catch (error) {
      console.error('Erro ao buscar por curso:', error)
    }
  }

  // Busca principal
  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    try {
      let results: Institution[]
      
      if (searchType === 'course') {
        const courseResults = await eMecScraper.searchByCourse(searchTerm, userLocation || undefined)
        results = courseResults as Institution[]
      } else {
        const typeResults = await eMecScraper.searchByType(searchTerm, userLocation || undefined)
        results = typeResults as Institution[]
      }
      
      setSearchResults(results)
      onSearch(results)
      addToRecentSearches(searchTerm)
    } catch (error) {
      console.error('Erro na busca:', error)
    }
  }

  // Adicionar à busca recente
  const addToRecentSearches = (term: string) => {
    const newSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5)
    setRecentSearches(newSearches)
  }

  // Busca com Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Limpar busca
  const handleClear = () => {
    setSearchTerm('')
    onSearch([])
  }

  return (
    <div className="glass p-6 border-l-4 border-[color:var(--primary-color)]">
      <div className="space-y-6">
        {/* Barra de busca principal */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[color:var(--main-text)]/50" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={searchType === 'course' ? 'Buscar por curso...' : 'Buscar por instituição...'}
                className="w-full pl-10 pr-10 py-2 glass border-0 text-[color:var(--main-text)] placeholder-[color:var(--main-text)]/50 focus:outline-none text-sm"
              />
              {searchTerm && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--main-text)]/50 hover:text-[color:var(--secondary-color)]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as 'course' | 'institution')}
              className="glass px-3 py-2 border-0 text-[color:var(--main-text)] focus:outline-none text-xs font-bold"
            >
              <option value="course">CURSOS</option>
              <option value="institution">INSTITUIÇÕES</option>
            </select>
            
            <button
              onClick={handleSearch}
              disabled={!searchTerm.trim() || loading}
              className="glass px-4 py-2 text-xs font-bold transition-all hover:bg-[color:var(--primary-color)]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 border-l-4 border-[color:var(--primary-color)]"
            >
              <Search className="h-4 w-4 text-[color:var(--primary-color)]" />
              <span>BUSCAR</span>
            </button>
            
            <button
              onClick={handleNearbySearch}
              disabled={!userLocation || loading}
              className="glass px-3 py-2 text-xs font-bold transition-all hover:bg-[color:var(--accent-color)]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 border-l-2 border-[color:var(--accent-color)]"
            >
              <MapPin className="h-3 w-3 text-[color:var(--accent-color)]" />
              <span>PRÓXIMAS</span>
            </button>
            
       
          </div>
        </div>

        {/* Botões de busca rápida */}
        <div className="space-y-4">

          {/* Filtros para periferia */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[color:var(--main-text)] flex items-center">
              <Lightbulb className="h-3 w-3 mr-1 text-[color:var(--accent-color)]" />
              OPÇÕES PARA PERIFERIA
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {peripheralFilters.map(({ label, icon: Icon, color, filter }) => (
                <button
                  key={filter}
                  onClick={() => handlePeripheralFilter(filter)}
                  disabled={loading}
                  className="glass px-2 py-1 text-xs font-bold transition-all hover:bg-[color:var(--accent-color)]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 border-l-2 border-[color:var(--accent-color)]"
                >
                  <Icon className={`h-3 w-3 ${color}`} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cursos populares */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[color:var(--main-text)] flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-[color:var(--accent-color)]" />
            CURSOS MAIS BUSCADOS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {popularCourses.map((course) => (
              <button
                key={course}
                onClick={() => handleCourseSearch(course)}
                disabled={loading}
                className="glass px-2 py-1 text-xs font-bold transition-all hover:bg-[color:var(--primary-color)]/20 disabled:opacity-50 disabled:cursor-not-allowed text-center"
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        {/* Buscas recentes */}
        {recentSearches.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[color:var(--main-text)] flex items-center">
              <Clock className="h-3 w-3 mr-1 text-[color:var(--warning-color)]" />
              BUSCAS RECENTES
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(search)
                    handleSearch()
                  }}
                  className="glass px-2 py-1 text-xs font-bold transition-all hover:bg-[color:var(--accent-color)]/20 text-center"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[color:var(--primary-color)]"></div>
            <span className="ml-3 text-sm text-[color:var(--main-text)]/70">Buscando instituições...</span>
          </div>
        )}
      </div>

      {/* Modal de comparação */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        institutions={searchResults}
        userLocation={userLocation}
      />
    </div>
  )
}

export default SearchBar 