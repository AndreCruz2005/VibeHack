export interface Transport {
  type: string
  line: string
  station?: string
  time: string
}

export interface Food {
  name: string
  price: string
  distance: string
}

export interface Costs {
  mensalidade: number
  material: number
  transporte: number
  alimentacao: number
}

export interface PeripheralMotivation {
  successStories: string[]
  supportPrograms: string[]
  careerGuidance: string
  financialSupport: string
}

export interface AcademicInfo {
  modality?: string
  eadPercentage: number
  library: boolean
  practicalClasses: boolean
  entranceExams?: string[]
  scholarships: string[]
  warnings: string[]
  admissionMethods: string[]
  careerGuidance: boolean
  peripheralSupport: boolean
  freeTransport: boolean
  socialAssistance: boolean
}

export interface CourseData {
  name: string
  code: string
  enadeScore: number
  ccScore: number
  duration: number
  modality: string
  mensalidade: number
  vagas: number
  turno: string
  area: string
}

export interface Institution {
  id: number
  name: string
  type: 'universidade' | 'escola_tecnica' | 'faculdade' | 'biblioteca'
  address: string
  coordinates: [number, number]
  distance?: number
  rating: number
  costs: Costs
  transport?: Transport[]
  food?: Food[]
  academicInfo: AcademicInfo
  warnings?: string[]
  enadeScore?: number
  igcScore?: number
  courses?: CourseData[]
  peripheralMotivation?: PeripheralMotivation
  transportCost?: number
  totalCost?: number
  accessibilityScore?: number
  qualityScore?: number
  costBenefitScore?: number
  overallScore?: number
}

// Alias para compatibilidade
export type InstitutionData = Institution 