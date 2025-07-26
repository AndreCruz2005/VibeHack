import React, { useState } from 'react'
import { Institution } from '../types/institution'
import {
  X,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
  Award,
  DollarSign,
  MapPin,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  BarChart3,
  Zap,
  Target,
  AlertTriangle,
  Info,
  Scale,
  ChevronDown,
  ChevronUp,
  Filter,
  Search
} from 'lucide-react'

interface ComparisonModalProps {
  isOpen: boolean
  onClose: () => void
  institutions: Institution[]
  userLocation: [number, number] | null
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  institutions,
  userLocation
}) => {
  const [selectedInstitutions, setSelectedInstitutions] = useState<Institution[]>([])
  const [comparisonType, setComparisonType] = useState<'overview' | 'detailed' | 'courses'>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'universidade' | 'escola_tecnica' | 'faculdade'>('all')

  // Adicionar instituição à comparação
  const addToComparison = (institution: Institution) => {
    if (selectedInstitutions.length < 3 && !selectedInstitutions.find(inst => inst.id === institution.id)) {
      setSelectedInstitutions([...selectedInstitutions, institution])
    }
  }

  // Remover instituição da comparação
  const removeFromComparison = (institutionId: number) => {
    setSelectedInstitutions(selectedInstitutions.filter(inst => inst.id !== institutionId))
  }

  // Calcular métricas dinâmicas
  const calculateMetrics = (institution: Institution) => {
    if (!userLocation) return null

    const distance = Math.sqrt(
      Math.pow(userLocation[0] - institution.coordinates[0], 2) +
      Math.pow(userLocation[1] - institution.coordinates[1], 2)
    ) * 111 // Aproximação km

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

  // Gerar prós e contras
  const generateProsAndCons = (institution: Institution) => {
    const pros: string[] = []
    const cons: string[] = []

    // Prós
    if (institution.costs.mensalidade === 0) {
      pros.push('Gratuita')
    }
    if (institution.rating >= 4.5) {
      pros.push('Alta qualidade')
    }
    if (institution.enadeScore && institution.enadeScore >= 4.0) {
      pros.push('Bom ENADE')
    }
    if (institution.igcScore && institution.igcScore >= 4.0) {
      pros.push('Bom IGC')
    }
    if (institution.academicInfo.library) {
      pros.push('Biblioteca disponível')
    }
    if (institution.academicInfo.practicalClasses) {
      pros.push('Aulas práticas')
    }
    if (institution.academicInfo.scholarships.length > 0) {
      pros.push('Bolsas disponíveis')
    }
    if (institution.type === 'universidade') {
      pros.push('Universidade completa')
    }

    // Contras
    if (institution.costs.mensalidade > 1000) {
      cons.push('Mensalidade cara')
    }
    if (institution.rating < 4.0) {
      cons.push('Qualidade moderada')
    }
    if (institution.enadeScore && institution.enadeScore < 3.5) {
      cons.push('ENADE baixo')
    }
    if (institution.academicInfo.eadPercentage > 0) {
      cons.push(`${institution.academicInfo.eadPercentage}% EAD`)
    }
    if (!institution.academicInfo.library) {
      cons.push('Sem biblioteca')
    }
    if (!institution.academicInfo.practicalClasses) {
      cons.push('Sem aulas práticas')
    }
    if (institution.academicInfo.scholarships.length === 0) {
      cons.push('Sem bolsas')
    }

    return { pros, cons }
  }

  // Filtrar instituições
  const filteredInstitutions = institutions.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inst.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || inst.type === filterType
    return matchesSearch && matchesFilter
  })

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fade-in comparison-modal"
      style={{ zIndex: 9999 }}
    >
      <div className="glass w-full h-full animate-slide-in relative overflow-hidden">
        {/* Header Flutuante */}
        <div className="absolute top-0 left-0 right-0 glass p-6 border-b-2 border-[color:var(--accent-color)] z-20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[color:var(--main-text)]">
                COMPARAÇÃO DE INSTITUIÇÕES
              </h2>
              <p className="text-sm text-[color:var(--main-text)]/70">
                Compare até 3 instituições simultaneamente
              </p>
            </div>
            <button
              onClick={onClose}
              className="glass p-3 hover:bg-[color:var(--secondary-color)]/20 transition-colors rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Barra de busca e filtros */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[color:var(--main-text)]/50" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar instituições..."
                className="w-full pl-10 pr-4 py-3 glass border-0 text-[color:var(--main-text)] placeholder-[color:var(--main-text)]/50 focus:outline-none rounded-lg"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="glass px-4 py-3 border-0 text-[color:var(--main-text)] focus:outline-none rounded-lg text-sm"
            >
              <option value="all">Todas</option>
              <option value="universidade">Universidades</option>
              <option value="faculdade">Faculdades</option>
              <option value="escola_tecnica">Escolas Técnicas</option>
            </select>
          </div>

          {/* Instituições selecionadas */}
          {selectedInstitutions.length > 0 && (
            <div className="flex items-center space-x-3 mt-3">
              <span className="text-sm font-bold text-[color:var(--main-text)]">Selecionadas:</span>
              {selectedInstitutions.map((institution) => (
                <div key={institution.id} className="glass px-3 py-2 text-sm flex items-center space-x-2 rounded-lg">
                  <span className="font-bold">{institution.name}</span>
                  <button
                    onClick={() => removeFromComparison(institution.id)}
                    className="text-[color:var(--secondary-color)] hover:text-[color:var(--secondary-color)]/70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 pt-32">
          {/* Lista de instituições disponíveis */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredInstitutions.map((institution) => {
              const isSelected = selectedInstitutions.find(inst => inst.id === institution.id)
              const metrics = calculateMetrics(institution)

              return (
                <div
                  key={institution.id}
                  onClick={() => addToComparison(institution)}
                  className={`glass p-4 cursor-pointer transition-all hover:scale-105 border-l-4 ${
                    isSelected 
                      ? 'border-[color:var(--accent-color)] bg-[color:var(--accent-color)]/10' 
                      : 'border-[color:var(--primary-color)]'
                  } ${selectedInstitutions.length >= 3 && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-[color:var(--main-text)] text-sm">{institution.name}</h3>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      isSelected 
                        ? 'bg-[color:var(--accent-color)] border-[color:var(--accent-color)]' 
                        : 'border-[color:var(--main-text)]/30'
                    }`}>
                      {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-xs text-[color:var(--main-text)]/70">
                    <div className="flex items-center justify-between">
                      <span>Avaliação:</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-[color:var(--warning-color)] mr-1" />
                        <span className="font-bold">{institution.rating}/5</span>
                      </div>
                    </div>
                    {metrics && (
                      <div className="flex items-center justify-between">
                        <span>Distância:</span>
                        <span className="font-bold">{metrics.distance} km</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span>Mensalidade:</span>
                      <span className="font-bold">
                        {institution.costs.mensalidade === 0 ? 'GRÁTIS' : `R$ ${institution.costs.mensalidade}`}
                      </span>
                    </div>
                    {institution.enadeScore && (
                      <div className="flex items-center justify-between">
                        <span>ENADE:</span>
                        <span className="font-bold text-[color:var(--accent-color)]">{institution.enadeScore}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Conteúdo da comparação */}
          {selectedInstitutions.length > 0 && (
            <div className="space-y-6">
              {/* Tabs de comparação */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setComparisonType('overview')}
                  className={`glass px-4 py-2 text-sm font-bold transition-all ${
                    comparisonType === 'overview' 
                      ? 'bg-[color:var(--primary-color)]/20 border-l-4 border-[color:var(--primary-color)]' 
                      : ''
                  }`}
                >
                  VISÃO GERAL
                </button>
                <button
                  onClick={() => setComparisonType('detailed')}
                  className={`glass px-4 py-2 text-sm font-bold transition-all ${
                    comparisonType === 'detailed' 
                      ? 'bg-[color:var(--primary-color)]/20 border-l-4 border-[color:var(--primary-color)]' 
                      : ''
                  }`}
                >
                  DETALHADO
                </button>
                <button
                  onClick={() => setComparisonType('courses')}
                  className={`glass px-4 py-2 text-sm font-bold transition-all ${
                    comparisonType === 'courses' 
                      ? 'bg-[color:var(--primary-color)]/20 border-l-4 border-[color:var(--primary-color)]' 
                      : ''
                  }`}
                >
                  CURSOS
                </button>
              </div>

              {/* Visão Geral */}
              {comparisonType === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedInstitutions.map((institution) => {
                    const metrics = calculateMetrics(institution)
                    const { pros, cons } = generateProsAndCons(institution)

                    return (
                      <div key={institution.id} className="glass p-4 border-l-4 border-[color:var(--primary-color)]">
                        <h3 className="font-bold text-[color:var(--main-text)] mb-3">{institution.name}</h3>
                        
                        {/* Métricas principais */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[color:var(--main-text)]/70">Avaliação:</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-[color:var(--warning-color)] mr-1" />
                              <span className="text-sm font-bold">{institution.rating}/5</span>
                            </div>
                          </div>
                          {metrics && (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-[color:var(--main-text)]/70">Distância:</span>
                                <span className="text-sm font-bold">{metrics.distance} km</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-[color:var(--main-text)]/70">Score Geral:</span>
                                <span className="text-sm font-bold text-[color:var(--accent-color)]">{metrics.overallScore}/10</span>
                              </div>
                            </>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[color:var(--main-text)]/70">Mensalidade:</span>
                            <span className="text-sm font-bold">
                              {institution.costs.mensalidade === 0 ? 'GRÁTIS' : `R$ ${institution.costs.mensalidade}`}
                            </span>
                          </div>
                        </div>

                        {/* Prós e Contras */}
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-bold text-[color:var(--accent-color)] mb-2 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              PRÓS ({pros.length})
                            </h4>
                            <div className="space-y-1">
                              {pros.map((pro, index) => (
                                <div key={index} className="text-xs text-[color:var(--main-text)]/80 flex items-center">
                                  <CheckCircle className="h-3 w-3 text-[color:var(--accent-color)] mr-1" />
                                  {pro}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-[color:var(--secondary-color)] mb-2 flex items-center">
                              <XCircle className="h-4 w-4 mr-1" />
                              CONTRAS ({cons.length})
                            </h4>
                            <div className="space-y-1">
                              {cons.map((con, index) => (
                                <div key={index} className="text-xs text-[color:var(--main-text)]/80 flex items-center">
                                  <XCircle className="h-3 w-3 text-[color:var(--secondary-color)] mr-1" />
                                  {con}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Comparação Detalhada */}
              {comparisonType === 'detailed' && (
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-[color:var(--accent-color)]">
                          <th className="text-left p-3 text-sm font-bold text-[color:var(--main-text)]">Critério</th>
                          {selectedInstitutions.map((institution) => (
                            <th key={institution.id} className="text-center p-3 text-sm font-bold text-[color:var(--main-text)]">
                              {institution.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="space-y-2">
                        <tr>
                          <td className="p-3 text-sm font-bold text-[color:var(--main-text)]">Avaliação</td>
                          {selectedInstitutions.map((institution) => (
                            <td key={institution.id} className="text-center p-3">
                              <div className="flex items-center justify-center">
                                <Star className="h-4 w-4 text-[color:var(--warning-color)] mr-1" />
                                <span className="text-sm font-bold">{institution.rating}/5</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3 text-sm font-bold text-[color:var(--main-text)]">ENADE</td>
                          {selectedInstitutions.map((institution) => (
                            <td key={institution.id} className="text-center p-3">
                              <div className="flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 text-[color:var(--accent-color)] mr-1" />
                                <span className="text-sm font-bold">{institution.enadeScore || 'N/A'}/5</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3 text-sm font-bold text-[color:var(--main-text)]">IGC</td>
                          {selectedInstitutions.map((institution) => (
                            <td key={institution.id} className="text-center p-3">
                              <div className="flex items-center justify-center">
                                <Award className="h-4 w-4 text-[color:var(--primary-color)] mr-1" />
                                <span className="text-sm font-bold">{institution.igcScore || 'N/A'}/5</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3 text-sm font-bold text-[color:var(--main-text)]">Mensalidade</td>
                          {selectedInstitutions.map((institution) => (
                            <td key={institution.id} className="text-center p-3">
                              <div className="flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-[color:var(--accent-color)] mr-1" />
                                <span className="text-sm font-bold">
                                  {institution.costs.mensalidade === 0 ? 'GRÁTIS' : `R$ ${institution.costs.mensalidade}`}
                                </span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3 text-sm font-bold text-[color:var(--main-text)]">Material</td>
                          {selectedInstitutions.map((institution) => (
                            <td key={institution.id} className="text-center p-3">
                              <span className="text-sm font-bold">R$ {institution.costs.material}</span>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3 text-sm font-bold text-[color:var(--main-text)]">Transporte</td>
                          {selectedInstitutions.map((institution) => (
                            <td key={institution.id} className="text-center p-3">
                              <span className="text-sm font-bold">R$ {institution.costs.transporte}</span>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3 text-sm font-bold text-[color:var(--main-text)]">Biblioteca</td>
                          {selectedInstitutions.map((institution) => (
                            <td key={institution.id} className="text-center p-3">
                              {institution.academicInfo.library ? (
                                <CheckCircle className="h-5 w-5 text-[color:var(--accent-color)] mx-auto" />
                              ) : (
                                <XCircle className="h-5 w-5 text-[color:var(--secondary-color)] mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3 text-sm font-bold text-[color:var(--main-text)]">Aulas Práticas</td>
                          {selectedInstitutions.map((institution) => (
                            <td key={institution.id} className="text-center p-3">
                              {institution.academicInfo.practicalClasses ? (
                                <CheckCircle className="h-5 w-5 text-[color:var(--accent-color)] mx-auto" />
                              ) : (
                                <XCircle className="h-5 w-5 text-[color:var(--secondary-color)] mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3 text-sm font-bold text-[color:var(--main-text)]">Bolsas</td>
                          {selectedInstitutions.map((institution) => (
                            <td key={institution.id} className="text-center p-3">
                              <span className="text-sm font-bold">{institution.academicInfo.scholarships.length}</span>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Comparação de Cursos */}
              {comparisonType === 'courses' && (
                <div className="space-y-6">
                  {selectedInstitutions.map((institution) => (
                    <div key={institution.id} className="glass p-4 border-l-4 border-[color:var(--accent-color)]">
                      <h3 className="font-bold text-[color:var(--main-text)] mb-4">{institution.name}</h3>
                      
                      {institution.courses && institution.courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {institution.courses.map((course, index) => (
                            <div key={index} className="glass p-3 border-l-4 border-[color:var(--warning-color)]">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-bold text-[color:var(--main-text)]">{course.name}</span>
                                <span className="text-xs text-[color:var(--main-text)]/70">{course.area}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="flex items-center">
                                  <TrendingUp className="h-3 w-3 mr-1 text-[color:var(--accent-color)]" />
                                  <span>ENADE: {course.enadeScore}/5</span>
                                </div>
                                <div className="flex items-center">
                                  <Award className="h-3 w-3 mr-1 text-[color:var(--primary-color)]" />
                                  <span>CC: {course.ccScore}/5</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1 text-[color:var(--warning-color)]" />
                                  <span>{course.duration} sem</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-3 w-3 mr-1 text-[color:var(--secondary-color)]" />
                                  <span>{course.vagas} vagas</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-2 text-xs">
                                <span className="text-[color:var(--main-text)]/70">{course.turno}</span>
                                <span className="font-bold text-[color:var(--main-text)]">
                                  {course.mensalidade === 0 ? 'GRÁTIS' : `R$ ${course.mensalidade}`}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="h-12 w-12 text-[color:var(--main-text)]/30 mx-auto mb-3" />
                          <p className="text-sm text-[color:var(--main-text)]/70">Nenhum curso disponível</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Estado vazio */}
          {selectedInstitutions.length === 0 && (
            <div className="text-center py-12">
              <Target className="h-16 w-16 text-[color:var(--main-text)]/30 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[color:var(--main-text)] mb-2">
                Selecione Instituições para Comparar
              </h3>
              <p className="text-sm text-[color:var(--main-text)]/70">
                Escolha até 3 instituições da lista acima para começar a comparação
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ComparisonModal 