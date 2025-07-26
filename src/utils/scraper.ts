import { Institution, CourseData } from '../types/institution'

// Função para calcular distância entre dois pontos
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

// Instituições do Recife com dados completos e foco em periferia
const recifeInstitutions: Institution[] = [
  {
    id: 1,
    name: 'Universidade Federal de Pernambuco (UFPE)',
    type: 'universidade',
    address: 'Av. Prof. Moraes Rego, 1235 - Cidade Universitária, Recife - PE',
    coordinates: [-8.0476, -34.9470],
    rating: 4.8,
    enadeScore: 4.2,
    igcScore: 4.5,
    costs: {
      mensalidade: 0,
      material: 800,
      transporte: 120,
      alimentacao: 450
    },
    academicInfo: {
      library: true,
      practicalClasses: true,
      eadPercentage: 0,
      scholarships: ['Prouni', 'FIES', 'Bolsas de Pesquisa', 'Auxílio Transporte', 'Auxílio Alimentação'],
      admissionMethods: ['SISU', 'Vestibular', 'Transferência'],
      warnings: ['Atenção: Verifique a validade do diploma no MEC'],
      careerGuidance: true,
      peripheralSupport: true,
      freeTransport: true,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['João Silva, do Alto José do Pinho, hoje é médico formado pela UFPE', 'Maria Santos, da Várzea, é professora universitária'],
      supportPrograms: ['Programa de Apoio a Estudantes de Baixa Renda', 'Mentoria para Estudantes da Periferia'],
      careerGuidance: 'Orientação profissional gratuita para todos os alunos',
      financialSupport: 'Auxílio transporte e alimentação para estudantes carentes'
    },
    courses: [
      {
        name: 'Medicina',
        code: 'MED001',
        enadeScore: 4.5,
        ccScore: 4.3,
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
        enadeScore: 4.2,
        ccScore: 4.0,
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
        enadeScore: 4.3,
        ccScore: 4.1,
        duration: 10,
        modality: 'Presencial',
        mensalidade: 0,
        vagas: 150,
        turno: 'Integral',
        area: 'Engenharias'
      },
      {
        name: 'Administração',
        code: 'ADM001',
        enadeScore: 4.0,
        ccScore: 3.8,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 0,
        vagas: 180,
        turno: 'Noturno',
        area: 'Ciências Sociais Aplicadas'
      },
      {
        name: 'Ciência da Computação',
        code: 'CC001',
        enadeScore: 4.4,
        ccScore: 4.2,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 0,
        vagas: 100,
        turno: 'Integral',
        area: 'Ciências Exatas'
      }
    ]
  },
  {
    id: 2,
    name: 'FAFIRE - Faculdade Frassinetti do Recife',
    type: 'faculdade',
    address: 'R. do Hospício, 130 - Boa Vista, Recife - PE',
    coordinates: [-8.0569, -34.8814],
    rating: 4.2,
    enadeScore: 3.8,
    igcScore: 4.0,
    costs: {
      mensalidade: 650,
      material: 400,
      transporte: 150,
      alimentacao: 500
    },
    academicInfo: {
      library: true,
      practicalClasses: true,
      eadPercentage: 25,
      scholarships: ['Prouni', 'FIES', 'Bolsas para Periferia', 'Descontos Progressivos'],
      admissionMethods: ['Vestibular', 'ENEM', 'Transferência'],
      warnings: ['Instituição reconhecida pelo MEC', 'Oferece cursos com 25% de EAD'],
      careerGuidance: true,
      peripheralSupport: true,
      freeTransport: false,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['Carlos Lima, do Coque, hoje é advogado formado pela FAFIRE', 'Ana Costa, do Alto do Mandu, é psicóloga'],
      supportPrograms: ['Programa de Inclusão Social', 'Bolsas para Estudantes da Periferia'],
      careerGuidance: 'Orientação profissional especializada para estudantes da periferia',
      financialSupport: 'Descontos especiais para estudantes de baixa renda'
    },
    courses: [
      {
        name: 'Direito',
        code: 'DIR002',
        enadeScore: 4.0,
        ccScore: 3.8,
        duration: 10,
        modality: 'Presencial',
        mensalidade: 650,
        vagas: 150,
        turno: 'Noturno',
        area: 'Ciências Sociais Aplicadas'
      },
      {
        name: 'Psicologia',
        code: 'PSI001',
        enadeScore: 3.9,
        ccScore: 3.7,
        duration: 10,
        modality: 'Presencial',
        mensalidade: 700,
        vagas: 80,
        turno: 'Integral',
        area: 'Ciências Humanas'
      },
      {
        name: 'Pedagogia',
        code: 'PED001',
        enadeScore: 3.7,
        ccScore: 3.5,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 600,
        vagas: 120,
        turno: 'Noturno',
        area: 'Ciências Humanas'
      }
    ]
  },
  {
    id: 3,
    name: 'UNIBRA - Centro Universitário Brasileiro',
    type: 'faculdade',
    address: 'R. Guilherme Pinto, 114 - Graças, Recife - PE',
    coordinates: [-8.0529, -34.8814],
    rating: 4.0,
    enadeScore: 3.6,
    igcScore: 3.8,
    costs: {
      mensalidade: 580,
      material: 350,
      transporte: 160,
      alimentacao: 520
    },
    academicInfo: {
      library: true,
      practicalClasses: true,
      eadPercentage: 30,
      scholarships: ['Prouni', 'FIES', 'Bolsas para Periferia', 'Descontos por Irmãos'],
      admissionMethods: ['Vestibular', 'ENEM', 'Transferência'],
      warnings: ['Instituição privada', 'Oferece cursos com 30% de EAD'],
      careerGuidance: true,
      peripheralSupport: true,
      freeTransport: false,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['Pedro Santos, do Alto do Mandu, hoje é administrador', 'Lucia Ferreira, do Coque, é contadora'],
      supportPrograms: ['Programa de Apoio a Estudantes da Periferia', 'Mentoria Profissional'],
      careerGuidance: 'Orientação profissional gratuita para estudantes da periferia',
      financialSupport: 'Bolsas especiais para estudantes de baixa renda'
    },
    courses: [
      {
        name: 'Administração',
        code: 'ADM002',
        enadeScore: 3.8,
        ccScore: 3.6,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 580,
        vagas: 120,
        turno: 'Noturno',
        area: 'Ciências Sociais Aplicadas'
      },
      {
        name: 'Contabilidade',
        code: 'CON001',
        enadeScore: 3.7,
        ccScore: 3.5,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 550,
        vagas: 100,
        turno: 'Noturno',
        area: 'Ciências Sociais Aplicadas'
      },
      {
        name: 'Sistemas de Informação',
        code: 'SI001',
        enadeScore: 3.9,
        ccScore: 3.7,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 620,
        vagas: 80,
        turno: 'Noturno',
        area: 'Ciências Exatas'
      }
    ]
  },
  {
    id: 4,
    name: 'CESAR School',
    type: 'faculdade',
    address: 'R. do Brum, 77 - Recife Antigo, Recife - PE',
    coordinates: [-8.0614, -34.8714],
    rating: 4.6,
    enadeScore: 4.3,
    igcScore: 4.5,
    costs: {
      mensalidade: 1200,
      material: 600,
      transporte: 140,
      alimentacao: 550
    },
    academicInfo: {
      library: true,
      practicalClasses: true,
      eadPercentage: 15,
      scholarships: ['Bolsas de Inovação', 'Bolsas para Periferia', 'Parcerias com Empresas'],
      admissionMethods: ['Vestibular', 'ENEM', 'Portfolio'],
      warnings: ['Foco em tecnologia e inovação', 'Parcerias com grandes empresas'],
      careerGuidance: true,
      peripheralSupport: true,
      freeTransport: false,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['Rafael Silva, do Alto José do Pinho, hoje é desenvolvedor na Google', 'Mariana Costa, da Várzea, é UX Designer'],
      supportPrograms: ['Programa de Inclusão Digital', 'Bolsas para Estudantes da Periferia'],
      careerGuidance: 'Orientação profissional focada em tecnologia e inovação',
      financialSupport: 'Bolsas especiais para estudantes da periferia'
    },
    courses: [
      {
        name: 'Ciência da Computação',
        code: 'CC002',
        enadeScore: 4.5,
        ccScore: 4.3,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 1200,
        vagas: 60,
        turno: 'Integral',
        area: 'Ciências Exatas'
      },
      {
        name: 'Design',
        code: 'DES001',
        enadeScore: 4.4,
        ccScore: 4.2,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 1100,
        vagas: 50,
        turno: 'Integral',
        area: 'Artes'
      },
      {
        name: 'Administração',
        code: 'ADM003',
        enadeScore: 4.2,
        ccScore: 4.0,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 1000,
        vagas: 80,
        turno: 'Noturno',
        area: 'Ciências Sociais Aplicadas'
      }
    ]
  },
  {
    id: 5,
    name: 'Faculdade Nova Roma',
    type: 'faculdade',
    address: 'R. do Hospício, 130 - Boa Vista, Recife - PE',
    coordinates: [-8.0569, -34.8814],
    rating: 3.8,
    enadeScore: 3.4,
    igcScore: 3.6,
    costs: {
      mensalidade: 480,
      material: 300,
      transporte: 155,
      alimentacao: 480
    },
    academicInfo: {
      library: true,
      practicalClasses: false,
      eadPercentage: 40,
      scholarships: ['Prouni', 'FIES', 'Bolsas Parciais'],
      admissionMethods: ['Vestibular', 'ENEM'],
      warnings: ['Instituição privada', 'Cursos com 40% de EAD', 'Verificar reconhecimento MEC'],
      careerGuidance: false,
      peripheralSupport: false,
      freeTransport: false,
      socialAssistance: false
    },
    peripheralMotivation: {
      successStories: ['Históricos limitados de sucesso'],
      supportPrograms: ['Programas básicos de bolsas'],
      careerGuidance: 'Orientação profissional limitada',
      financialSupport: 'Bolsas básicas disponíveis'
    },
    courses: [
      {
        name: 'Pedagogia',
        code: 'PED002',
        enadeScore: 3.5,
        ccScore: 3.3,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 480,
        vagas: 100,
        turno: 'Noturno',
        area: 'Ciências Humanas'
      },
      {
        name: 'Letras',
        code: 'LET001',
        enadeScore: 3.4,
        ccScore: 3.2,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 450,
        vagas: 80,
        turno: 'Noturno',
        area: 'Ciências Humanas'
      }
    ]
  },
  {
    id: 6,
    name: 'UNIFG - Centro Universitário dos Guararapes',
    type: 'faculdade',
    address: 'Av. Dr. José Rufino, 3000 - Jaboatão dos Guararapes - PE',
    coordinates: [-8.1123, -34.9778],
    rating: 4.1,
    enadeScore: 3.7,
    igcScore: 3.9,
    costs: {
      mensalidade: 720,
      material: 400,
      transporte: 180,
      alimentacao: 580
    },
    academicInfo: {
      library: true,
      practicalClasses: true,
      eadPercentage: 20,
      scholarships: ['Prouni', 'FIES', 'Bolsas para Periferia'],
      admissionMethods: ['Vestibular', 'ENEM', 'Transferência'],
      warnings: ['Instituição privada', 'Oferece cursos com 20% de EAD'],
      careerGuidance: true,
      peripheralSupport: true,
      freeTransport: false,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['João Paulo, do Alto do Mandu, hoje é engenheiro', 'Maria José, do Coque, é enfermeira'],
      supportPrograms: ['Programa de Apoio a Estudantes da Periferia', 'Mentoria Profissional'],
      careerGuidance: 'Orientação profissional para estudantes da periferia',
      financialSupport: 'Bolsas especiais para estudantes de baixa renda'
    },
    courses: [
      {
        name: 'Engenharia de Produção',
        code: 'ENG003',
        enadeScore: 3.9,
        ccScore: 3.7,
        duration: 10,
        modality: 'Presencial',
        mensalidade: 720,
        vagas: 80,
        turno: 'Integral',
        area: 'Engenharias'
      },
      {
        name: 'Administração',
        code: 'ADM004',
        enadeScore: 3.7,
        ccScore: 3.5,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 680,
        vagas: 120,
        turno: 'Noturno',
        area: 'Ciências Sociais Aplicadas'
      },
      {
        name: 'Enfermagem',
        code: 'ENF001',
        enadeScore: 3.8,
        ccScore: 3.6,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 750,
        vagas: 60,
        turno: 'Integral',
        area: 'Ciências da Saúde'
      }
    ]
  },
  {
    id: 7,
    name: 'Estácio - Centro Universitário Estácio do Recife',
    type: 'faculdade',
    address: 'R. Marques do Pombal, 57 - Santo Amaro, Recife - PE',
    coordinates: [-8.0589, -34.8818],
    rating: 3.9,
    enadeScore: 3.5,
    igcScore: 3.7,
    costs: {
      mensalidade: 650,
      material: 350,
      transporte: 160,
      alimentacao: 520
    },
    academicInfo: {
      library: true,
      practicalClasses: true,
      eadPercentage: 35,
      scholarships: ['Prouni', 'FIES', 'Bolsas para Periferia', 'Descontos Progressivos'],
      admissionMethods: ['Vestibular', 'ENEM', 'Transferência'],
      warnings: ['Rede privada', 'Oferece cursos com 35% de EAD', 'Verificar qualidade por unidade'],
      careerGuidance: true,
      peripheralSupport: true,
      freeTransport: false,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['Carlos Eduardo, do Alto José do Pinho, hoje é administrador', 'Ana Paula, da Várzea, é contadora'],
      supportPrograms: ['Programa de Inclusão Social', 'Bolsas para Estudantes da Periferia'],
      careerGuidance: 'Orientação profissional para estudantes da periferia',
      financialSupport: 'Bolsas e descontos para estudantes de baixa renda'
    },
    courses: [
      {
        name: 'Administração',
        code: 'ADM005',
        enadeScore: 3.6,
        ccScore: 3.4,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 650,
        vagas: 150,
        turno: 'Noturno',
        area: 'Ciências Sociais Aplicadas'
      },
      {
        name: 'Contabilidade',
        code: 'CON002',
        enadeScore: 3.5,
        ccScore: 3.3,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 620,
        vagas: 120,
        turno: 'Noturno',
        area: 'Ciências Sociais Aplicadas'
      },
      {
        name: 'Sistemas de Informação',
        code: 'SI002',
        enadeScore: 3.7,
        ccScore: 3.5,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 680,
        vagas: 100,
        turno: 'Noturno',
        area: 'Ciências Exatas'
      }
    ]
  },
  {
    id: 8,
    name: 'UNOPAR - Universidade Norte do Paraná',
    type: 'faculdade',
    address: 'Av. Conde da Boa Vista, 921 - Boa Vista, Recife - PE',
    coordinates: [-8.0569, -34.8814],
    rating: 3.7,
    enadeScore: 3.3,
    igcScore: 3.5,
    costs: {
      mensalidade: 580,
      material: 320,
      transporte: 155,
      alimentacao: 500
    },
    academicInfo: {
      library: true,
      practicalClasses: false,
      eadPercentage: 45,
      scholarships: ['Prouni', 'FIES', 'Bolsas Parciais'],
      admissionMethods: ['Vestibular', 'ENEM'],
      warnings: ['Rede privada', 'Cursos com 45% de EAD', 'Verificar qualidade'],
      careerGuidance: false,
      peripheralSupport: false,
      freeTransport: false,
      socialAssistance: false
    },
    peripheralMotivation: {
      successStories: ['Históricos limitados de sucesso'],
      supportPrograms: ['Programas básicos de bolsas'],
      careerGuidance: 'Orientação profissional limitada',
      financialSupport: 'Bolsas básicas disponíveis'
    },
    courses: [
      {
        name: 'Pedagogia',
        code: 'PED003',
        enadeScore: 3.4,
        ccScore: 3.2,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 580,
        vagas: 120,
        turno: 'Noturno',
        area: 'Ciências Humanas'
      },
      {
        name: 'Letras',
        code: 'LET002',
        enadeScore: 3.3,
        ccScore: 3.1,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 550,
        vagas: 100,
        turno: 'Noturno',
        area: 'Ciências Humanas'
      },
      {
        name: 'Administração',
        code: 'ADM006',
        enadeScore: 3.5,
        ccScore: 3.3,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 600,
        vagas: 150,
        turno: 'Noturno',
        area: 'Ciências Sociais Aplicadas'
      }
    ]
  },
  {
    id: 9,
    name: 'Universidade Católica de Pernambuco (UNICAP)',
    type: 'universidade',
    address: 'R. do Príncipe, 526 - Boa Vista, Recife - PE',
    coordinates: [-8.0569, -34.8814],
    rating: 4.5,
    enadeScore: 4.0,
    igcScore: 4.2,
    costs: {
      mensalidade: 1200,
      material: 600,
      transporte: 150,
      alimentacao: 500
    },
    academicInfo: {
      library: true,
      practicalClasses: true,
      eadPercentage: 15,
      scholarships: ['Prouni', 'Bolsas Institucionais', 'Desconto por Irmãos', 'Bolsas para Periferia'],
      admissionMethods: ['Vestibular', 'ENEM', 'Transferência'],
      warnings: ['Instituição reconhecida pelo MEC'],
      careerGuidance: true,
      peripheralSupport: true,
      freeTransport: false,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['Roberto Silva, do Alto José do Pinho, hoje é médico', 'Fernanda Costa, da Várzea, é advogada'],
      supportPrograms: ['Programa de Inclusão Social', 'Bolsas para Estudantes da Periferia'],
      careerGuidance: 'Orientação profissional especializada para estudantes da periferia',
      financialSupport: 'Bolsas especiais para estudantes de baixa renda'
    },
    courses: [
      {
        name: 'Medicina',
        code: 'MED003',
        enadeScore: 4.3,
        ccScore: 4.1,
        duration: 12,
        modality: 'Presencial',
        mensalidade: 3500,
        vagas: 80,
        turno: 'Integral',
        area: 'Ciências da Saúde'
      },
      {
        name: 'Direito',
        code: 'DIR003',
        enadeScore: 4.1,
        ccScore: 3.9,
        duration: 10,
        modality: 'Presencial',
        mensalidade: 1200,
        vagas: 150,
        turno: 'Noturno',
        area: 'Ciências Sociais Aplicadas'
      },
      {
        name: 'Psicologia',
        code: 'PSI002',
        enadeScore: 4.2,
        ccScore: 4.0,
        duration: 10,
        modality: 'Presencial',
        mensalidade: 1400,
        vagas: 100,
        turno: 'Integral',
        area: 'Ciências Humanas'
      }
    ]
  },
  {
    id: 10,
    name: 'Universidade de Pernambuco (UPE)',
    type: 'universidade',
    address: 'R. Arnóbio Marques, 310 - Santo Amaro, Recife - PE',
    coordinates: [-8.0589, -34.8818],
    rating: 4.3,
    enadeScore: 3.9,
    igcScore: 4.0,
    costs: {
      mensalidade: 0,
      material: 700,
      transporte: 130,
      alimentacao: 480
    },
    academicInfo: {
      library: true,
      practicalClasses: true,
      eadPercentage: 5,
      scholarships: ['Prouni', 'FIES', 'Bolsas de Extensão', 'Auxílio Transporte'],
      admissionMethods: ['SISU', 'Vestibular', 'Transferência'],
      warnings: ['Universidade pública estadual'],
      careerGuidance: true,
      peripheralSupport: true,
      freeTransport: true,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['Lucas Santos, do Alto do Mandu, hoje é enfermeiro', 'Patrícia Lima, do Coque, é fisioterapeuta'],
      supportPrograms: ['Programa de Apoio a Estudantes de Baixa Renda', 'Mentoria para Estudantes da Periferia'],
      careerGuidance: 'Orientação profissional gratuita para todos os alunos',
      financialSupport: 'Auxílio transporte e alimentação para estudantes carentes'
    },
    courses: [
      {
        name: 'Enfermagem',
        code: 'ENF002',
        enadeScore: 4.1,
        ccScore: 3.9,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 0,
        vagas: 80,
        turno: 'Integral',
        area: 'Ciências da Saúde'
      },
      {
        name: 'Fisioterapia',
        code: 'FIS001',
        enadeScore: 4.0,
        ccScore: 3.8,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 0,
        vagas: 60,
        turno: 'Integral',
        area: 'Ciências da Saúde'
      },
      {
        name: 'Pedagogia',
        code: 'PED004',
        enadeScore: 3.8,
        ccScore: 3.6,
        duration: 8,
        modality: 'Presencial',
        mensalidade: 0,
        vagas: 120,
        turno: 'Noturno',
        area: 'Ciências Humanas'
      }
    ]
  },
  {
    id: 11,
    name: 'Instituto Federal de Pernambuco (IFPE)',
    type: 'escola_tecnica',
    address: 'Av. Prof. Luiz Freire, 500 - Cidade Universitária, Recife - PE',
    coordinates: [-8.0476, -34.9470],
    rating: 4.4,
    enadeScore: 4.1,
    igcScore: 4.3,
    costs: {
      mensalidade: 0,
      material: 600,
      transporte: 125,
      alimentacao: 460
    },
    academicInfo: {
      library: true,
      practicalClasses: true,
      eadPercentage: 0,
      scholarships: ['Bolsas de Iniciação Científica', 'Auxílio Transporte'],
      admissionMethods: ['Vestibular', 'SISU'],
      warnings: ['Instituição pública federal'],
      careerGuidance: true,
      peripheralSupport: true,
      freeTransport: true,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['Diego Silva, do Alto José do Pinho, hoje é técnico em informática', 'Camila Santos, da Várzea, é técnica em enfermagem'],
      supportPrograms: ['Programa de Inclusão Tecnológica', 'Bolsas para Estudantes da Periferia'],
      careerGuidance: 'Orientação profissional focada em tecnologia e saúde',
      financialSupport: 'Auxílio transporte para estudantes carentes'
    },
    courses: [
      {
        name: 'Técnico em Informática',
        code: 'TEC001',
        enadeScore: 4.2,
        ccScore: 4.0,
        duration: 6,
        modality: 'Presencial',
        mensalidade: 0,
        vagas: 60,
        turno: 'Integral',
        area: 'Tecnologia'
      },
      {
        name: 'Técnico em Administração',
        code: 'TEC002',
        enadeScore: 4.0,
        ccScore: 3.8,
        duration: 6,
        modality: 'Presencial',
        mensalidade: 0,
        vagas: 80,
        turno: 'Noturno',
        area: 'Gestão'
      },
      {
        name: 'Técnico em Enfermagem',
        code: 'TEC003',
        enadeScore: 4.1,
        ccScore: 3.9,
        duration: 6,
        modality: 'Presencial',
        mensalidade: 0,
        vagas: 50,
        turno: 'Integral',
        area: 'Saúde'
      }
    ]
  },
  {
    id: 12,
    name: 'SENAC - Serviço Nacional de Aprendizagem Comercial',
    type: 'escola_tecnica',
    address: 'R. Marques do Pombal, 57 - Santo Amaro, Recife - PE',
    coordinates: [-8.0589, -34.8818],
    rating: 4.2,
    enadeScore: 3.9,
    igcScore: 4.1,
    costs: {
      mensalidade: 400,
      material: 300,
      transporte: 155,
      alimentacao: 520
    },
    academicInfo: {
      library: true,
      practicalClasses: true,
      eadPercentage: 25,
      scholarships: ['Bolsas para Empregados', 'Descontos Especiais', 'Bolsas para Periferia'],
      admissionMethods: ['Processo Seletivo', 'Transferência'],
      warnings: ['Instituição do Sistema S'],
      careerGuidance: true,
      peripheralSupport: true,
      freeTransport: false,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['Ricardo Lima, do Alto do Mandu, hoje é técnico em marketing', 'Juliana Costa, do Coque, é técnica em logística'],
      supportPrograms: ['Programa de Inclusão Profissional', 'Bolsas para Estudantes da Periferia'],
      careerGuidance: 'Orientação profissional focada no mercado de trabalho',
      financialSupport: 'Bolsas especiais para estudantes da periferia'
    },
    courses: [
      {
        name: 'Técnico em Marketing',
        code: 'TEC004',
        enadeScore: 4.0,
        ccScore: 3.8,
        duration: 6,
        modality: 'Presencial',
        mensalidade: 400,
        vagas: 70,
        turno: 'Noturno',
        area: 'Marketing'
      },
      {
        name: 'Técnico em Logística',
        code: 'TEC005',
        enadeScore: 3.9,
        ccScore: 3.7,
        duration: 6,
        modality: 'Presencial',
        mensalidade: 380,
        vagas: 60,
        turno: 'Noturno',
        area: 'Logística'
      },
      {
        name: 'Técnico em Recursos Humanos',
        code: 'TEC006',
        enadeScore: 3.8,
        ccScore: 3.6,
        duration: 6,
        modality: 'Presencial',
        mensalidade: 350,
        vagas: 50,
        turno: 'Noturno',
        area: 'Gestão'
      }
    ]
  },
  {
    id: 13,
    name: 'Biblioteca Pública Estadual',
    type: 'biblioteca',
    address: 'R. do Imperador, 290 - Santo Antônio, Recife - PE',
    coordinates: [-8.0614, -34.8714],
    rating: 4.0,
    costs: {
      mensalidade: 0,
      material: 0,
      transporte: 140,
      alimentacao: 450
    },
    academicInfo: {
      library: true,
      practicalClasses: false,
      eadPercentage: 0,
      scholarships: [],
      admissionMethods: ['Acesso Livre'],
      warnings: ['Biblioteca pública gratuita'],
      careerGuidance: false,
      peripheralSupport: true,
      freeTransport: false,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['Muitos estudantes da periferia usam a biblioteca para estudar'],
      supportPrograms: ['Acesso gratuito a livros e internet'],
      careerGuidance: 'Livros de orientação profissional disponíveis',
      financialSupport: 'Acesso totalmente gratuito'
    }
  },
  {
    id: 14,
    name: 'Biblioteca Central da UFPE',
    type: 'biblioteca',
    address: 'Av. Prof. Moraes Rego, 1235 - Cidade Universitária, Recife - PE',
    coordinates: [-8.0476, -34.9470],
    rating: 4.5,
    costs: {
      mensalidade: 0,
      material: 0,
      transporte: 120,
      alimentacao: 450
    },
    academicInfo: {
      library: true,
      practicalClasses: false,
      eadPercentage: 0,
      scholarships: [],
      admissionMethods: ['Acesso para Estudantes UFPE', 'Acesso Externo com Cadastro'],
      warnings: ['Biblioteca universitária'],
      careerGuidance: false,
      peripheralSupport: true,
      freeTransport: false,
      socialAssistance: true
    },
    peripheralMotivation: {
      successStories: ['Estudantes da periferia frequentam para pesquisas'],
      supportPrograms: ['Acesso gratuito a acervo acadêmico'],
      careerGuidance: 'Acervo especializado em orientação profissional',
      financialSupport: 'Acesso gratuito para estudantes'
    }
  }
]

// Função para calcular métricas dinâmicas para uma lista de instituições
const calculateDynamicMetrics = (institutions: Institution[], userLocation?: [number, number]): Institution[] => {
  if (!userLocation) return institutions

  return institutions.map(institution => {
    const distance = calculateDistance(
      userLocation[0], userLocation[1],
      institution.coordinates[0], institution.coordinates[1]
    )
    
    // Calcular custo total incluindo transporte e alimentação
    const transportCost = Math.round(distance * 2.5)
    const totalCost = institution.costs.mensalidade + institution.costs.material + institution.costs.transporte + institution.costs.alimentacao + transportCost
    
    const accessibilityScore = Math.max(0, 10 - distance * 2)
    
    // Calcular qualidade baseada na média do ENADE dos cursos
    const averageEnade = institution.courses 
      ? institution.courses.reduce((sum: number, course: CourseData) => sum + course.enadeScore, 0) / institution.courses.length
      : institution.enadeScore || 0
    
    const qualityScore = (
      averageEnade * 0.5 +
      (institution.igcScore || 0) * 0.3 +
      institution.rating * 0.2
    )
    
    const costBenefitScore = institution.costs.mensalidade === 0 
      ? 10 
      : Math.max(0, 10 - (totalCost / 100))

    return {
      ...institution,
      distance: Math.round(distance * 10) / 10,
      transportCost,
      totalCost,
      accessibilityScore: Math.round(accessibilityScore * 10) / 10,
      qualityScore: Math.round(qualityScore * 10) / 10,
      costBenefitScore: Math.round(costBenefitScore * 10) / 10,
      overallScore: Math.round((accessibilityScore + qualityScore + costBenefitScore) / 3 * 10) / 10
    }
  })
}

// Buscar instituições próximas
export const searchNearbyInstitutions = async (userLocation: [number, number], radius: number = 10): Promise<Institution[]> => {
  const results = recifeInstitutions.filter(inst => {
    const distance = calculateDistance(
      userLocation[0], userLocation[1],
      inst.coordinates[0], inst.coordinates[1]
    )
    return distance <= radius
  })
  
  return calculateDynamicMetrics(results, userLocation)
}

// Buscar por curso
export const searchByCourse = async (courseName: string, userLocation?: [number, number]): Promise<Institution[]> => {
  const results = recifeInstitutions.filter(inst => 
    inst.courses?.some((course: CourseData) => 
      course.name.toLowerCase().includes(courseName.toLowerCase())
    )
  )
  
  return calculateDynamicMetrics(results, userLocation)
}

// Buscar por área
export const searchByArea = async (areaName: string, userLocation?: [number, number]): Promise<Institution[]> => {
  const results = recifeInstitutions.filter(inst => 
    inst.courses?.some((course: CourseData) => 
      course.area.toLowerCase().includes(areaName.toLowerCase())
    )
  )
  
  return calculateDynamicMetrics(results, userLocation)
}

// Buscar por tipo de instituição
export const searchByType = async (type: string, userLocation?: [number, number]): Promise<Institution[]> => {
  const results = recifeInstitutions.filter(inst => 
    inst.type.toLowerCase().includes(type.toLowerCase())
  )
  
  return calculateDynamicMetrics(results, userLocation)
}

// Obter estatísticas gerais
export const getStatistics = async (): Promise<any> => {
  const totalInstitutions = recifeInstitutions.length
  const publicInstitutions = recifeInstitutions.filter(inst => inst.costs.mensalidade === 0).length
  const privateInstitutions = totalInstitutions - publicInstitutions
  
  const allCourses = recifeInstitutions.flatMap(inst => inst.courses || [])
  const totalCourses = allCourses.length
  
  const averageEnadeScore = allCourses.length > 0 
    ? allCourses.reduce((sum, course) => sum + course.enadeScore, 0) / allCourses.length
    : 0
  
  const averageIGCScore = recifeInstitutions.length > 0
    ? recifeInstitutions.reduce((sum, inst) => sum + (inst.igcScore || 0), 0) / recifeInstitutions.length
    : 0
  
  const areas = [...new Set(allCourses.map(course => course.area))]
  
  return {
    totalInstitutions,
    publicInstitutions,
    privateInstitutions,
    totalCourses,
    averageEnadeScore: Math.round(averageEnadeScore * 10) / 10,
    averageIGCScore: Math.round(averageIGCScore * 10) / 10,
    areas
  }
}

// Simular scraper do e-MEC
export const eMecScraper = {
  // Buscar todas as instituições
  searchInstitutions: async (userLocation?: [number, number]): Promise<Institution[]> => {
    return calculateDynamicMetrics(recifeInstitutions, userLocation)
  },

  // Buscar instituições próximas
  searchNearby: async (userLocation: [number, number], radius: number = 10): Promise<Institution[]> => {
    const results = recifeInstitutions.filter(inst => {
      const distance = calculateDistance(
        userLocation[0], userLocation[1],
        inst.coordinates[0], inst.coordinates[1]
      )
      return distance <= radius
    })
    
    return calculateDynamicMetrics(results, userLocation)
  },

  // Buscar por curso
  searchByCourse: async (courseName: string, userLocation?: [number, number]): Promise<Institution[]> => {
    const results = recifeInstitutions.filter(inst => 
      inst.courses?.some((course: CourseData) => 
        course.name.toLowerCase().includes(courseName.toLowerCase())
      )
    )
    
    return calculateDynamicMetrics(results, userLocation)
  },

  // Buscar por área
  searchByArea: async (areaName: string, userLocation?: [number, number]): Promise<Institution[]> => {
    const results = recifeInstitutions.filter(inst => 
      inst.courses?.some((course: CourseData) => 
        course.area.toLowerCase().includes(areaName.toLowerCase())
      )
    )
    
    return calculateDynamicMetrics(results, userLocation)
  },

  // Buscar por tipo de instituição
  searchByType: async (type: string, userLocation?: [number, number]): Promise<Institution[]> => {
    const results = recifeInstitutions.filter(inst => 
      inst.type.toLowerCase().includes(type.toLowerCase())
    )
    
    return calculateDynamicMetrics(results, userLocation)
  },

  // Obter detalhes de uma instituição
  getInstitutionDetails: async (institutionId: number): Promise<Institution | null> => {
    const institution = recifeInstitutions.find(inst => inst.id === institutionId)
    return institution || null
  },

  // Obter estatísticas
  getStatistics: async (): Promise<any> => {
    return getStatistics()
  }
} 