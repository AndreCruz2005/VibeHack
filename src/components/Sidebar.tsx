import React, { useState, useEffect } from 'react'
import { Institution } from '../types/institution'
import {
  MapPin,
  Star,
  DollarSign,
  Bus,
  Utensils,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  X,
  Clock,
  Shield,
  TrendingUp,
  Search,
  Filter,
  Navigation,
  Target,
  Award,
  Users,
  BarChart3,
  Zap,
  Route,
  Scale,
  ChevronDown,
  ChevronUp,
  Calendar,
  BookOpenCheck,
  GraduationCap as GraduationCapIcon,
  Building2,
  School,
  Library,
  Lightbulb,
  Globe
} from 'lucide-react'
import { eMecScraper } from '../utils/scraper'
import PeripheralMotivation from './PeripheralMotivation'
import InstitutionWarnings from './InstitutionWarnings'

interface SidebarProps {
  institutions: Institution[]
  selectedInstitution: Institution | null
  onSelectInstitution: (institution: Institution | null) => void
  userLocation: [number, number] | null
  loading: boolean
  onOpenComparison: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  institutions,
  selectedInstitution,
  onSelectInstitution,
  userLocation,
  loading,
  onOpenComparison
}) => {
  const [nearbyInstitutions, setNearbyInstitutions] = useState<Institution[]>([])
  const [isSearchingNearby, setIsSearchingNearby] = useState(false)
  const [searchRadius, setSearchRadius] = useState(10) // km
  const [filterType, setFilterType] = useState<'all' | 'universidade' | 'escola_tecnica' | 'faculdade'>('all')
  const [statistics, setStatistics] = useState<any>(null)

  const [expandedInstitution, setExpandedInstitution] = useState<Institution | null>(null)
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set())
  const [locationName, setLocationName] = useState<string>('Detectando...')
  const [dark, setDark] = useState<boolean>(false)

  // Função para calcular distância entre duas coordenadas (fórmula de Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Detectar localização e tema
  useEffect(() => {
    if (userLocation) {
      // Converter coordenadas para nome da cidade
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation[0]}&lon=${userLocation[1]}`)
        .then(response => response.json())
        .then(data => {
          const city = data.address?.city || data.address?.town || data.address?.municipality || 'Sua localização'
          setLocationName(city)
        })
        .catch(() => {
          setLocationName('Sua localização')
        })
    }
  }, [userLocation])

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(dark ? 'theme-dark' : 'theme-light')
  }, [dark])

  // Buscar instituições próximas
  const searchNearbyInstitutions = async () => {
    if (!userLocation) return

    setIsSearchingNearby(true)
    try {
      const results = await eMecScraper.searchNearby(userLocation, searchRadius)
      setNearbyInstitutions(results as Institution[])
      
      // Buscar estatísticas
      const stats = await eMecScraper.getStatistics()
      setStatistics(stats)
    } catch (error) {
      console.error('Erro ao buscar instituições próximas:', error)
      // Fallback para dados mock
      generateMockNearbyInstitutions()
    } finally {
      setIsSearchingNearby(false)
    }
  }

  // Gerar dados mock para instituições próximas
  const generateMockNearbyInstitutions = () => {
    const mockInstitutions: Institution[] = [
      {
        id: 1,
        name: 'UFPE - Universidade Federal de Pernambuco',
        type: 'universidade',
        address: 'Av. Prof. Moraes Rego, 1235 - Cidade Universitária, Recife',
        coordinates: [-8.0476, -34.9470],
        distance: 2.1,
        rating: 4.8,
        costs: { mensalidade: 0, material: 150, transporte: 120, alimentacao: 450 },
        transport: [
          { type: 'Ônibus', line: 'Bairro Novo', station: 'UFPE', time: '15 min' },
          { type: 'Metrô', line: 'Linha Sul', station: 'UFPE', time: '8 min' }
        ],
        food: [
          { name: 'Restaurante Universitário', price: 'R$ 2,50', distance: '0,1 km' },
          { name: 'Cantina Central', price: 'R$ 8,00', distance: '0,2 km' }
        ],
        academicInfo: {
          modality: 'Presencial',
          eadPercentage: 0,
          library: true,
          practicalClasses: true,
          entranceExams: ['SISU', 'Vestibular'],
          scholarships: ['PNAES', 'PRAEC'],
          warnings: ['Atenção: Vestibular anual', 'Documentação necessária para bolsas'],
          admissionMethods: ['SISU', 'Vestibular'],
          careerGuidance: true,
          peripheralSupport: true,
          freeTransport: true,
          socialAssistance: true
        },
        warnings: ['Atenção: Vestibular anual', 'Documentação necessária para bolsas'],
        enadeScore: 4.2,
        igcScore: 4.5,
        courses: [
          {
            name: 'Medicina',
            code: 'MED001',
            enadeScore: 4.8,
            ccScore: 5.0,
            duration: 12,
            modality: 'Presencial',
            mensalidade: 0,
            vagas: 120,
            turno: 'Integral',
            area: 'Ciências da Saúde'
          },
          {
            name: 'Direito',
            code: 'DIR001',
            enadeScore: 4.5,
            ccScore: 4.8,
            duration: 10,
            modality: 'Presencial',
            mensalidade: 0,
            vagas: 200,
            turno: 'Noturno',
            area: 'Ciências Sociais Aplicadas'
          },
          {
            name: 'Engenharia Civil',
            code: 'ENG001',
            enadeScore: 4.2,
            ccScore: 4.5,
            duration: 10,
            modality: 'Presencial',
            mensalidade: 0,
            vagas: 80,
            turno: 'Integral',
            area: 'Engenharias'
          }
        ]
      },
      {
        id: 2,
        name: 'UNICAP - Universidade Católica de Pernambuco',
        type: 'universidade',
        address: 'R. do Príncipe, 526 - Boa Vista, Recife',
        coordinates: [-8.0500, -34.8800],
        distance: 3.5,
        rating: 4.6,
        costs: { mensalidade: 1200, material: 200, transporte: 150, alimentacao: 500 },
        transport: [
          { type: 'Ônibus', line: 'Centro', station: 'UNICAP', time: '20 min' },
          { type: 'Metrô', line: 'Linha Centro', station: 'Boa Vista', time: '12 min' }
        ],
        food: [
          { name: 'Restaurante Universitário', price: 'R$ 5,00', distance: '0,1 km' },
          { name: 'Cantina', price: 'R$ 10,00', distance: '0,2 km' }
        ],
        academicInfo: {
          modality: 'Presencial',
          eadPercentage: 15,
          library: true,
          practicalClasses: true,
          entranceExams: ['Vestibular', 'ENEM'],
          scholarships: ['Prouni', 'Bolsa Social'], warnings: ['Mensalidade pode variar por curso', 'Bolsas disponíveis'], admissionMethods: ['Vestibular', 'ENEM'], careerGuidance: true, peripheralSupport: true, freeTransport: false, socialAssistance: true
        },
        warnings: ['Mensalidade pode variar por curso', 'Bolsas disponíveis'],
        enadeScore: 4.0,
        igcScore: 4.2,
        courses: [
          {
            name: 'Psicologia',
            code: 'PSI001',
            enadeScore: 4.3,
            ccScore: 4.6,
            duration: 10,
            modality: 'Presencial',
            mensalidade: 1200,
            vagas: 60,
            turno: 'Integral',
            area: 'Ciências Humanas'
          },
          {
            name: 'Administração',
            code: 'ADM001',
            enadeScore: 4.1,
            ccScore: 4.3,
            duration: 8,
            modality: 'Presencial',
            mensalidade: 1000,
            vagas: 120,
            turno: 'Noturno',
            area: 'Ciências Sociais Aplicadas'
          }
        ]
      },
      {
        id: 3,
        name: 'IFPE - Instituto Federal de Pernambuco',
        type: 'escola_tecnica',
        address: 'Av. Prof. Luiz Freire, 500 - Cidade Universitária, Recife',
        coordinates: [-8.0450, -34.9450],
        distance: 1.8,
        rating: 4.4,
        costs: { mensalidade: 0, material: 100, transporte: 100, alimentacao: 300 },
        transport: [
          { type: 'Ônibus', line: 'Bairro Novo', station: 'IFPE', time: '12 min' },
          { type: 'Metrô', line: 'Linha Sul', station: 'IFPE', time: '6 min' }
        ],
        food: [
          { name: 'Refeitório', price: 'R$ 3,00', distance: '0,1 km' },
          { name: 'Cantina', price: 'R$ 6,00', distance: '0,2 km' }
        ],
        academicInfo: {
          modality: 'Presencial',
          eadPercentage: 0,
          library: true,
          practicalClasses: true,
          entranceExams: ['Vestibular'],
          scholarships: ['Bolsa Permanência'], warnings: ['Cursos técnicos gratuitos', 'Foco em tecnologia'], admissionMethods: ['Vestibular'], careerGuidance: true, peripheralSupport: true, freeTransport: true, socialAssistance: true
        },
        warnings: ['Cursos técnicos gratuitos', 'Foco em tecnologia'],
        enadeScore: 4.3,
        igcScore: 4.4,
        courses: [
          {
            name: 'Técnico em Informática',
            code: 'TEC001',
            enadeScore: 4.5,
            ccScore: 4.7,
            duration: 6,
            modality: 'Presencial',
            mensalidade: 0,
            vagas: 40,
            turno: 'Integral',
            area: 'Tecnologia'
          },
          {
            name: 'Técnico em Mecatrônica',
            code: 'TEC002',
            enadeScore: 4.2,
            ccScore: 4.4,
            duration: 6,
            modality: 'Presencial',
            mensalidade: 0,
            vagas: 30,
            turno: 'Integral',
            area: 'Tecnologia'
          }
        ]
      }
    ]
    setNearbyInstitutions(mockInstitutions)
  }

  // Filtrar instituições
  const filteredInstitutions = institutions.filter(inst => {
    if (filterType === 'all') return true
    return inst.type === filterType
  })

  // Calcular métricas dinâmicas
  const calculateDynamicMetrics = (institution: Institution) => {
    if (!userLocation) return null

    const distance = calculateDistance(
      userLocation[0], userLocation[1],
      institution.coordinates[0], institution.coordinates[1]
    )
    
    const transportCost = Math.round(distance * 2.5)
    const totalCost = institution.costs.mensalidade + institution.costs.material + transportCost
    const accessibilityScore = Math.max(0, 10 - distance * 2)
    const qualityScore = (
      (institution.enadeScore || 0) * 0.4 +
      (institution.igcScore || 0) * 0.3 +
      institution.rating * 0.3
    )
    const costBenefitScore = institution.costs.mensalidade === 0 
      ? 10 
      : Math.max(0, 10 - (totalCost / 100))

    return {
      distance: Math.round(distance * 10) / 10,
      transportCost,
      totalCost,
      accessibilityScore: Math.round(accessibilityScore * 10) / 10,
      qualityScore: Math.round(qualityScore * 10) / 10,
      costBenefitScore: Math.round(costBenefitScore * 10) / 10,
      overallScore: Math.round((accessibilityScore + qualityScore + costBenefitScore) / 3 * 10) / 10
    }
  }

  // Expandir/colapsar instituição
  const toggleInstitutionExpansion = (institution: Institution) => {
    if (expandedInstitution?.id === institution.id) {
      setExpandedInstitution(null)
      setExpandedCourses(new Set())
    } else {
      setExpandedInstitution(institution)
      setExpandedCourses(new Set())
    }
  }

  // Expandir/colapsar curso específico
  const toggleCourseExpansion = (courseCode: string) => {
    const newExpanded = new Set(expandedCourses)
    if (newExpanded.has(courseCode)) {
      newExpanded.delete(courseCode)
    } else {
      newExpanded.add(courseCode)
    }
    setExpandedCourses(newExpanded)
  }

  // Obter ícone do tipo de instituição
  const getInstitutionIcon = (type: string) => {
    switch (type) {
      case 'universidade':
        return <GraduationCapIcon className="h-4 w-4" />
      case 'escola_tecnica':
        return <School className="h-4 w-4" />
      case 'faculdade':
        return <Building2 className="h-4 w-4" />
      case 'biblioteca':
        return <Library className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <>
      <div className={`h-full glass border-l-2 border-[color:var(--primary-color)] overflow-y-auto animate-slide-in transition-all duration-300 ${
        expandedInstitution ? 'w-[50%]' : 'w-80'
      }`}>
        <div className="p-3 border-b-2 border-[color:var(--accent-color)]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-[color:var(--main-text)]">
              INSTITUIÇÕES DO RECIFE
            </h2>
            <div className="flex items-center space-x-1">
              <button
                onClick={onOpenComparison}
                disabled={institutions.length === 0}
                className="glass px-2 py-1 text-xs font-bold transition-all hover:bg-[color:var(--warning-color)]/20 disabled:opacity-50"
                title="Comparar instituições"
              >
                <Scale className="h-3 w-3" />
              </button>
              <button
                onClick={searchNearbyInstitutions}
                disabled={isSearchingNearby || !userLocation}
                className="glass px-2 py-1 text-xs font-bold transition-all hover:bg-[color:var(--accent-color)]/20 disabled:opacity-50"
              >
                {isSearchingNearby ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-[color:var(--accent-color)]"></div>
                ) : (
                  <Target className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>

          {/* Localização e tema */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1 glass px-2 py-1">
              <Globe className="h-3 w-3 text-[color:var(--accent-color)]" />
              <span className="text-xs font-medium text-[color:var(--main-text)]">{locationName}</span>
            </div>
            
            <button
              className="glass p-1 transition-all hover:bg-[color:var(--primary-color)]/20"
              title={dark ? 'Tema claro' : 'Tema escuro'}
              onClick={() => setDark(d => !d)}
              aria-label="Trocar tema"
            >
              <Lightbulb
                className={`h-3 w-3 ${dark ? 'text-[color:var(--warning-color)]' : 'text-[color:var(--warning-color)]'}`}
                strokeWidth={2.5}
                fill={dark ? 'currentColor' : 'none'}
              />
            </button>
          </div>
          
          {/* Filtros */}
          <div className="grid grid-cols-2 gap-1 mb-3">
            <button
              onClick={() => setFilterType('all')}
              className={`glass px-2 py-1 text-xs font-bold transition-all ${
                filterType === 'all' 
                  ? 'bg-[color:var(--primary-color)]/20 border-l-4 border-[color:var(--primary-color)]' 
                  : ''
              }`}
            >
              TODAS
            </button>
            <button
              onClick={() => setFilterType('universidade')}
              className={`glass px-2 py-1 text-xs font-bold transition-all ${
                filterType === 'universidade' 
                  ? 'bg-[color:var(--primary-color)]/20 border-l-4 border-[color:var(--primary-color)]' 
                  : ''
              }`}
            >
              UNIVERSIDADES
            </button>
            <button
              onClick={() => setFilterType('escola_tecnica')}
              className={`glass px-2 py-1 text-xs font-bold transition-all ${
                filterType === 'escola_tecnica' 
                  ? 'bg-[color:var(--primary-color)]/20 border-l-4 border-[color:var(--primary-color)]' 
                  : ''
              }`}
            >
              ESCOLAS TÉCNICAS
            </button>
            <button
              onClick={() => setFilterType('faculdade')}
              className={`glass px-2 py-1 text-xs font-bold transition-all ${
                filterType === 'faculdade' 
                  ? 'bg-[color:var(--primary-color)]/20 border-l-4 border-[color:var(--primary-color)]' 
                  : ''
              }`}
            >
              FACULDADES
            </button>
          </div>

          {/* Estatísticas */}
          {statistics && (
            <div className="glass p-2 mb-3 border-l-4 border-[color:var(--accent-color)]">
              <h3 className="text-xs font-bold text-[color:var(--main-text)] mb-1">ESTATÍSTICAS DO RECIFE</h3>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1 text-[color:var(--primary-color)]" />
                  <span>{statistics.totalInstitutions} instituições</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-3 w-3 mr-1 text-[color:var(--accent-color)]" />
                  <span>{statistics.totalCourses} cursos</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-[color:var(--warning-color)]" />
                  <span>ENADE: {statistics.averageEnadeScore}/5</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-3 w-3 mr-1 text-[color:var(--secondary-color)]" />
                  <span>IGC: {statistics.averageIGCScore}/5</span>
                </div>
              </div>
            </div>
          )}

          {/* Botões de ação rápida */}
          <div className="mb-3 space-y-2">
            <button className="glass w-full p-2 font-bold transition-all hover:bg-[color:var(--primary-color)]/20 flex items-center justify-center space-x-2 border-l-4 border-[color:var(--primary-color)]">
              <Search className="h-4 w-4 text-[color:var(--primary-color)]" />
              <span className="text-sm">PESQUISAR</span>
            </button>
          </div>
        </div>

        {/* Lista de instituições */}
        <div className="p-3 space-y-2">
          {filteredInstitutions.length > 0 ? (
            filteredInstitutions.map((institution) => {
              const metrics = calculateDynamicMetrics(institution)
              const isExpanded = expandedInstitution?.id === institution.id

              return (
                <div key={institution.id} className="space-y-2">
                  {/* Card da instituição */}
                  <div
                    onClick={() => toggleInstitutionExpansion(institution)}
                    className="glass p-2 cursor-pointer transition-all hover:scale-105 border-l-4 border-[color:var(--primary-color)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getInstitutionIcon(institution.type)}
                        <div>
                          <h3 className="text-sm font-bold text-[color:var(--main-text)]">{institution.name}</h3>
                          <div className="flex items-center space-x-4 text-xs text-[color:var(--main-text)]/70">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              <span>{institution.rating}/5</span>
                            </div>
                            {institution.enadeScore && (
                              <div className="flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                <span>ENADE: {institution.enadeScore}/5</span>
                              </div>
                            )}
                            {metrics && (
                              <div className="flex items-center">
                                <Zap className="h-3 w-3 mr-1" />
                                <span>Score: {metrics.overallScore}/10</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[color:var(--main-text)]">
                          {institution.costs.mensalidade === 0 ? 'GRÁTIS' : `R$ ${institution.costs.mensalidade}`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-[color:var(--accent-color)]" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-[color:var(--main-text)]/50" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo expandido */}
                  {isExpanded && (
                    <div className="glass p-2 ml-3 border-l-4 border-[color:var(--accent-color)] animate-fade-in">
                      {/* Informações da instituição */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[color:var(--main-text)]/70">Endereço:</span>
                          <span className="font-medium">{institution.address}</span>
                        </div>
                        {metrics && (
                          <>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[color:var(--main-text)]/70">Distância:</span>
                              <span className="font-medium">{metrics.distance} km</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[color:var(--main-text)]/70">Custo transporte:</span>
                              <span className="font-medium">R$ {metrics.transportCost}/mês</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[color:var(--main-text)]/70">Custo total:</span>
                              <span className="font-medium">R$ {metrics.totalCost}/mês</span>
                            </div>
                          </>
                        )}
                        {institution.igcScore && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[color:var(--main-text)]/70">IGC:</span>
                            <span className="font-medium">{institution.igcScore}/5</span>
                          </div>
                        )}
                      </div>

                      {/* Métricas dinâmicas */}
                      {metrics && (
                        <div className="mb-3 p-2 glass border-l-4 border-[color:var(--warning-color)]">
                          <h4 className="text-xs font-bold text-[color:var(--main-text)] mb-1">MÉTRICAS DINÂMICAS</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[color:var(--main-text)]/70">Acessibilidade:</span>
                              <span className="font-medium text-[color:var(--accent-color)]">{metrics.accessibilityScore}/10</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[color:var(--main-text)]/70">Qualidade:</span>
                              <span className="font-medium text-[color:var(--warning-color)]">{metrics.qualityScore}/10</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[color:var(--main-text)]/70">Custo-benefício:</span>
                              <span className="font-medium text-[color:var(--primary-color)]">{metrics.costBenefitScore}/10</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[color:var(--main-text)]/70">Score geral:</span>
                              <span className="font-bold text-[color:var(--accent-color)]">{metrics.overallScore}/10</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Motivação para Periferia */}
                      <PeripheralMotivation institution={institution} />

                      {/* Avisos Importantes */}
                      <InstitutionWarnings institution={institution} />

                      {/* Cursos disponíveis */}
                      {institution.courses && institution.courses.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-[color:var(--main-text)] mb-2 flex items-center">
                            <BookOpenCheck className="h-3 w-3 mr-1" />
                            CURSOS DISPONÍVEIS ({institution.courses.length})
                          </h4>
                          <div className="space-y-1">
                            {institution.courses.map((course) => {
                              const isCourseExpanded = expandedCourses.has(course.code)
                              
                              return (
                                <div key={course.code} className="space-y-1">
                                  {/* Card do curso */}
                                  <div
                                    onClick={() => toggleCourseExpansion(course.code)}
                                    className="glass p-1 cursor-pointer transition-all hover:scale-105 border-l-4 border-[color:var(--warning-color)]"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <h5 className="text-xs font-bold text-[color:var(--main-text)]">{course.name}</h5>
                                        <div className="flex items-center space-x-3 text-xs text-[color:var(--main-text)]/70">
                                          <span>{course.area}</span>
                                          <span>{course.turno}</span>
                                          <span>{course.duration} sem</span>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-xs font-bold text-[color:var(--main-text)]">
                                          {course.mensalidade === 0 ? 'GRÁTIS' : `R$ ${course.mensalidade}`}
                                        </span>
                                        {isCourseExpanded ? (
                                          <ChevronUp className="h-3 w-3 text-[color:var(--warning-color)]" />
                                        ) : (
                                          <ChevronDown className="h-3 w-3 text-[color:var(--main-text)]/50" />
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Detalhes do curso */}
                                  {isCourseExpanded && (
                                    <div className="glass p-1 ml-3 border-l-4 border-[color:var(--secondary-color)] animate-fade-in">
                                      <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center justify-between">
                                          <span className="text-[color:var(--main-text)]/70">ENADE:</span>
                                          <span className="font-medium text-[color:var(--accent-color)]">{course.enadeScore}/5</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-[color:var(--main-text)]/70">CC:</span>
                                          <span className="font-medium text-[color:var(--warning-color)]">{course.ccScore}/5</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-[color:var(--main-text)]/70">Vagas:</span>
                                          <span className="font-medium">{course.vagas}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-[color:var(--main-text)]/70">Duração:</span>
                                          <span className="font-medium">{course.duration} semestres</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-[color:var(--main-text)]/70">Turno:</span>
                                          <span className="font-medium">{course.turno}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-[color:var(--main-text)]/70">Modalidade:</span>
                                          <span className="font-medium">{course.modality}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-[color:var(--main-text)]/70">Mensalidade:</span>
                                          <span className="font-bold text-[color:var(--main-text)]">
                                            {course.mensalidade === 0 ? 'GRÁTIS' : `R$ ${course.mensalidade}`}
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-[color:var(--main-text)]/70">Área:</span>
                                          <span className="font-medium">{course.area}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-[color:var(--main-text)]/30 mx-auto mb-3" />
              <p className="text-sm text-[color:var(--main-text)]/70">
                {loading ? 'Carregando instituições...' : 'Nenhuma instituição encontrada em Recife'}
              </p>
            </div>
          )}
        </div>
      </div>

    </>
  )
}

export default Sidebar 