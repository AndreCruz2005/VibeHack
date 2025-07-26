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
  ChevronUp
} from 'lucide-react'

interface QuickComparisonProps {
  institutions: Institution[]
  userLocation: [number, number] | null
  onClose: () => void
}

const QuickComparison: React.FC<QuickComparisonProps> = ({
  institutions,
  userLocation,
  onClose
}) => {
  const [selectedInstitutions, setSelectedInstitutions] = useState<Institution[]>([])
  const [showComparison, setShowComparison] = useState(false)

  // Adicionar/remover instituição da comparação
  const toggleInstitution = (institution: Institution) => {
    if (selectedInstitutions.find(inst => inst.id === institution.id)) {
      setSelectedInstitutions(selectedInstitutions.filter(inst => inst.id !== institution.id))
    } else if (selectedInstitutions.length < 3) {
      setSelectedInstitutions([...selectedInstitutions, institution])
    }
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
      pros.push('Biblioteca')
    }
    if (institution.academicInfo.practicalClasses) {
      pros.push('Aulas práticas')
    }
    if (institution.academicInfo.scholarships.length > 0) {
      pros.push('Bolsas')
    }

    // Contras
    if (institution.costs.mensalidade > 1000) {
      cons.push('Cara')
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

    return { pros, cons }
  }

  if (showComparison && selectedInstitutions.length > 0) {
    return (
      <div className="fixed top-4 right-4 z-50 max-w-md animate-fade-in">
        <div className="glass p-4 border-l-4 border-[color:var(--accent-color)] shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[color:var(--main-text)]">COMPARAÇÃO RÁPIDA</h3>
            <button
              onClick={() => setShowComparison(false)}
              className="text-[color:var(--main-text)]/60 hover:text-[color:var(--secondary-color)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {selectedInstitutions.map((institution) => {
              const metrics = calculateMetrics(institution)
              const { pros, cons } = generateProsAndCons(institution)

              return (
                <div key={institution.id} className="glass p-3 border-l-4 border-[color:var(--primary-color)]">
                  <h4 className="font-bold text-[color:var(--main-text)] mb-2 text-sm">{institution.name}</h4>
                  
                  {/* Métricas principais */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[color:var(--main-text)]/70">Avaliação:</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-[color:var(--warning-color)] mr-1" />
                        <span className="font-bold">{institution.rating}/5</span>
                      </div>
                    </div>
                    {metrics && (
                      <>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[color:var(--main-text)]/70">Distância:</span>
                          <span className="font-bold">{metrics.distance} km</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[color:var(--main-text)]/70">Score:</span>
                          <span className="font-bold text-[color:var(--accent-color)]">{metrics.overallScore}/10</span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[color:var(--main-text)]/70">Mensalidade:</span>
                      <span className="font-bold">
                        {institution.costs.mensalidade === 0 ? 'GRÁTIS' : `R$ ${institution.costs.mensalidade}`}
                      </span>
                    </div>
                  </div>

                  {/* Prós e Contras */}
                  <div className="space-y-2">
                    <div>
                      <h5 className="text-xs font-bold text-[color:var(--accent-color)] mb-1 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        PRÓS ({pros.length})
                      </h5>
                      <div className="space-y-1">
                        {pros.slice(0, 3).map((pro, index) => (
                          <div key={index} className="text-xs text-[color:var(--main-text)]/80 flex items-center">
                            <CheckCircle className="h-2 w-2 text-[color:var(--accent-color)] mr-1" />
                            {pro}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-[color:var(--secondary-color)] mb-1 flex items-center">
                        <XCircle className="h-3 w-3 mr-1" />
                        CONTRAS ({cons.length})
                      </h5>
                      <div className="space-y-1">
                        {cons.slice(0, 3).map((con, index) => (
                          <div key={index} className="text-xs text-[color:var(--main-text)]/80 flex items-center">
                            <XCircle className="h-2 w-2 text-[color:var(--secondary-color)] mr-1" />
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

          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="glass px-4 py-2 text-sm font-bold transition-all hover:bg-[color:var(--accent-color)]/20"
            >
              FECHAR COMPARAÇÃO
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-fade-in">
      <div className="glass p-4 border-l-4 border-[color:var(--primary-color)] shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[color:var(--main-text)]">INSTITUIÇÕES PRÓXIMAS</h3>
          <button
            onClick={onClose}
            className="text-[color:var(--main-text)]/60 hover:text-[color:var(--secondary-color)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-[color:var(--main-text)]/70 mb-4">
          Selecione até 3 instituições para comparar rapidamente:
        </p>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {institutions.map((institution) => {
            const isSelected = selectedInstitutions.find(inst => inst.id === institution.id)
            const metrics = calculateMetrics(institution)

            return (
              <div
                key={institution.id}
                onClick={() => toggleInstitution(institution)}
                className={`glass p-3 cursor-pointer transition-all hover:scale-105 border-l-4 ${
                  isSelected 
                    ? 'border-[color:var(--accent-color)] bg-[color:var(--accent-color)]/10' 
                    : 'border-[color:var(--primary-color)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[color:var(--main-text)] text-sm">{institution.name}</h4>
                    <div className="flex items-center space-x-4 text-xs text-[color:var(--main-text)]/70">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        <span>{institution.rating}/5</span>
                      </div>
                      {metrics && (
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{metrics.distance} km</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        <span>{institution.costs.mensalidade === 0 ? 'GRÁTIS' : `R$ ${institution.costs.mensalidade}`}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    isSelected 
                      ? 'bg-[color:var(--accent-color)] border-[color:var(--accent-color)]' 
                      : 'border-[color:var(--main-text)]/30'
                  }`}>
                    {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {selectedInstitutions.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowComparison(true)}
              className="glass px-6 py-3 text-sm font-bold transition-all hover:bg-[color:var(--accent-color)]/20 flex items-center space-x-2 mx-auto"
            >
              <Scale className="h-4 w-4" />
              <span>COMPARAR {selectedInstitutions.length} INSTITUIÇÕES</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuickComparison 