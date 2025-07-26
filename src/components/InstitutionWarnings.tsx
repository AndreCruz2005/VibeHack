import React from 'react'
import { AlertTriangle, Shield, Info, CheckCircle, XCircle } from 'lucide-react'

interface InstitutionWarningsProps {
  institution: any
}

const InstitutionWarnings: React.FC<InstitutionWarningsProps> = ({ institution }) => {
  if (!institution.academicInfo?.warnings || institution.academicInfo.warnings.length === 0) {
    return null
  }

  const getWarningIcon = (warning: string) => {
    if (warning.toLowerCase().includes('golpe') || warning.toLowerCase().includes('enganoso')) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    } else if (warning.toLowerCase().includes('verificar') || warning.toLowerCase().includes('atenção')) {
      return <Shield className="h-4 w-4 text-yellow-500" />
    } else if (warning.toLowerCase().includes('gratuito') || warning.toLowerCase().includes('público')) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    } else {
      return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getWarningColor = (warning: string) => {
    if (warning.toLowerCase().includes('golpe') || warning.toLowerCase().includes('enganoso')) {
      return 'border-red-500 bg-red-50 dark:bg-red-900/20'
    } else if (warning.toLowerCase().includes('verificar') || warning.toLowerCase().includes('atenção')) {
      return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
    } else if (warning.toLowerCase().includes('gratuito') || warning.toLowerCase().includes('público')) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/20'
    } else {
      return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
    }
  }

  return (
    <div className="glass p-4 rounded-xl border-l-4 border-[color:var(--warning-color)] animate-fade-in">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-[color:var(--warning-color)] rounded-lg">
          <AlertTriangle className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-[color:var(--main-text)]">
          Avisos Importantes
        </h3>
      </div>

      <div className="space-y-3">
        {institution.academicInfo.warnings.map((warning: string, index: number) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border-l-4 ${getWarningColor(warning)}`}
          >
            <div className="flex items-start space-x-3">
              {getWarningIcon(warning)}
              <p className="text-sm text-[color:var(--main-text)]/90">{warning}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Informações sobre EAD */}
      {institution.academicInfo.eadPercentage > 0 && (
        <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded-lg">
          <div className="flex items-center space-x-2">
            <Info className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-[color:var(--main-text)]">
              Atenção: {institution.academicInfo.eadPercentage}% de EAD em cursos presenciais
            </span>
          </div>
        </div>
      )}

      {/* Informações sobre biblioteca */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-[color:var(--main-text)]/90">
            Biblioteca: {institution.academicInfo.library ? 'Disponível' : 'Não disponível'}
            {institution.type === 'biblioteca' && ' - Acesso público'}
          </span>
        </div>
      </div>

      {/* Formas de ingresso */}
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg">
        <div className="flex items-center space-x-2">
          <Info className="h-4 w-4 text-green-500" />
          <span className="text-sm text-[color:var(--main-text)]/90">
            Formas de ingresso: {institution.academicInfo.admissionMethods?.join(', ') || 'Não informado'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InstitutionWarnings 