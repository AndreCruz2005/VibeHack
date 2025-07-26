import React from 'react'
import { AlertTriangle, Shield, DollarSign, Users, BookOpen, CheckCircle, XCircle } from 'lucide-react'

interface PeripheralMotivationProps {
  institution: any
}

const PeripheralMotivation: React.FC<PeripheralMotivationProps> = ({ institution }) => {
  if (!institution.peripheralMotivation) {
    return null
  }

  const { supportPrograms, careerGuidance, financialSupport } = institution.peripheralMotivation

  // Função para determinar o tipo de instituição e retornar conteúdo personalizado
  const getInstitutionContent = (institutionName: string) => {
    const name = institutionName.toLowerCase()
    
    // Instituições com práticas negativas
    if (name.includes('unopar') || name.includes('estácio') || name.includes('estacio') || name.includes('uninassau')) {
      return {
        type: 'negative',
        title: '⚠️ ATENÇÃO - Práticas Questionáveis',
        warnings: [
          'Financiamento DIS forçado e abusivo',
          'Promessas falsas de emprego garantido',
          'Taxas ocultas e cobranças extras',
          'Pressão para assinar contratos longos',
          'Qualidade de ensino questionável',
          'Suporte ao estudante insuficiente'
        ],
        icon: <XCircle className="h-3 w-3 mr-1 text-[color:var(--secondary-color)]" />,
        bgColor: 'bg-[color:var(--secondary-color)]/10',
        borderColor: 'border-[color:var(--secondary-color)]'
      }
    }
    
    // Instituições públicas ou sem fins lucrativos
    if (name.includes('ufpe') || name.includes('ufrpe') || name.includes('upe') || 
        name.includes('ifpe') || name.includes('fafire') || name.includes('cesar') ||
        name.includes('pública') || name.includes('publica') || name.includes('federal') ||
        name.includes('estadual') || name.includes('municipal')) {
      return {
        type: 'positive',
        title: '✅ Apoio de Qualidade',
        benefits: [
          'Educação gratuita e de qualidade',
          'Bolsas e auxílios disponíveis',
          'Suporte acadêmico completo',
          'Infraestrutura adequada',
          'Professores qualificados',
          'Programas de inclusão social'
        ],
        icon: <CheckCircle className="h-3 w-3 mr-1 text-[color:var(--accent-color)]" />,
        bgColor: 'bg-[color:var(--accent-color)]/10',
        borderColor: 'border-[color:var(--accent-color)]'
      }
    }
    
    // Instituições privadas regulares
    return {
      type: 'neutral',
      title: 'ℹ️ Apoio Padrão',
      info: [
        'Verificar qualidade antes de matricular',
        'Comparar preços e condições',
        'Ler contrato com atenção',
        'Pesquisar reputação da instituição',
        'Verificar reconhecimento do MEC',
        'Considerar alternativas públicas'
      ],
      icon: <Shield className="h-3 w-3 mr-1 text-[color:var(--warning-color)]" />,
      bgColor: 'bg-[color:var(--warning-color)]/10',
      borderColor: 'border-[color:var(--warning-color)]'
    }
  }

  const content = getInstitutionContent(institution.name)

  return (
    <div className={`glass p-4 rounded-xl border-l-4 ${content.borderColor} animate-fade-in`}>
      <div className="flex items-center space-x-2 mb-3">
        <div className="p-1 bg-[color:var(--primary-color)] rounded">
          <Shield className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-[color:var(--main-text)]">
          Apoio Proporcionado para Estudantes
        </h3>
      </div>

      {/* Conteúdo Personalizado por Instituição */}
      <div className="mb-3">
        <h4 className="text-xs font-semibold text-[color:var(--main-text)] mb-2 flex items-center">
          {content.icon}
          {content.title}
        </h4>
        <div className={`space-y-1 text-xs ${content.bgColor} p-2 rounded`}>
          {content.type === 'negative' && content.warnings?.map((warning: string, index: number) => (
            <div key={index} className="text-[color:var(--secondary-color)] flex items-center space-x-1">
              <XCircle className="h-3 w-3 text-[color:var(--secondary-color)]" />
              <span>{warning}</span>
            </div>
          ))}
          {content.type === 'positive' && content.benefits?.map((benefit: string, index: number) => (
            <div key={index} className="text-[color:var(--accent-color)] flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-[color:var(--accent-color)]" />
              <span>{benefit}</span>
            </div>
          ))}
          {content.type === 'neutral' && content.info?.map((info: string, index: number) => (
            <div key={index} className="text-[color:var(--warning-color)] flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3 text-[color:var(--warning-color)]" />
              <span>{info}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Programas de Apoio */}
      {supportPrograms && supportPrograms.length > 0 && (
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-[color:var(--main-text)] mb-2 flex items-center">
            <Users className="h-3 w-3 mr-1 text-[color:var(--secondary-color)]" />
            Programas de Apoio
          </h4>
          <div className="space-y-1">
            {supportPrograms.map((program: string, index: number) => (
              <div key={index} className="text-xs text-[color:var(--main-text)]/80 flex items-center space-x-1">
                <div className="w-1 h-1 bg-[color:var(--secondary-color)] rounded-full"></div>
                <span>{program}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orientação de Carreira */}
      {careerGuidance && (
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-[color:var(--main-text)] mb-2 flex items-center">
            <BookOpen className="h-3 w-3 mr-1 text-[color:var(--warning-color)]" />
            Orientação de Carreira
          </h4>
          <div className="text-xs text-[color:var(--main-text)]/80 bg-[color:var(--warning-color)]/10 p-2 rounded">
            ✓ Acompanhamento personalizado
            <br />
            ✓ Mentoria com profissionais
            <br />
            ✓ Workshops de desenvolvimento
          </div>
        </div>
      )}

      {/* Apoio Financeiro */}
      {financialSupport && (
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-[color:var(--main-text)] mb-2 flex items-center">
            <DollarSign className="h-3 w-3 mr-1 text-[color:var(--primary-color)]" />
            Bolsas e Apoio Financeiro
          </h4>
          <div className="text-xs text-[color:var(--main-text)]/80 bg-[color:var(--primary-color)]/10 p-2 rounded">
            ✓ Bolsas de estudo disponíveis
            <br />
            ✓ Parcelamento facilitado
            <br />
            ✓ Descontos para periferia
          </div>
        </div>
      )}
    </div>
  )
}

export default PeripheralMotivation 