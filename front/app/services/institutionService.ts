import type { Institution, FilterCriteria } from '~/types/institution';

// TODO: Substituir por chamadas reais para o backend
const API_BASE_URL = 'http://localhost:3001/api'; // Backend fictício

export const institutionService = {
  // Buscar instituições com filtros
  async searchInstitutions(filters: FilterCriteria): Promise<Institution[]> {
    try {
      // TODO: Implementar chamada real para o backend
      // const response = await fetch(`${API_BASE_URL}/institutions/search`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(filters),
      // });
      // return await response.json();
      
      // Mock data por enquanto - aplicar filtros
      const allInstitutions = this.getMockInstitutions();
      return this.applyFilters(allInstitutions, filters);
    } catch (error) {
      console.error('Erro ao buscar instituições:', error);
      throw error;
    }
  },

  // Aplicar filtros aos dados
  applyFilters(institutions: Institution[], filters: FilterCriteria): Institution[] {
    return institutions.filter(institution => {
      // Filtro por termo de busca (nome da instituição e descrição)
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        const nameMatch = institution.name.toLowerCase().includes(searchTerm);
        const descriptionMatch = institution.description.toLowerCase().includes(searchTerm);
        const courseMatch = institution.availableCourses.some(course => 
          course.name.toLowerCase().includes(searchTerm)
        );
        
        if (!nameMatch && !descriptionMatch && !courseMatch) {
          return false;
        }
      }

      // Filtro por orçamento (mensalidade)
      if (institution.monthlyFee < filters.budget.min || institution.monthlyFee > filters.budget.max) {
        return false;
      }

      // Filtro por avaliação MEC
      if (filters.mecRating > 0 && institution.mecRating < filters.mecRating) {
        return false;
      }

      // Filtro por avaliação dos estudantes
      if (filters.studentRating > 0 && institution.studentRating < filters.studentRating) {
        return false;
      }

      // Filtro por infraestrutura
      if (filters.infrastructure.length > 0) {
        const hasAllInfrastructure = filters.infrastructure.every(infra => 
          institution.infrastructure.includes(infra)
        );
        if (!hasAllInfrastructure) {
          return false;
        }
      }

      // Filtro por localização (estado)
      if (filters.location.state && !institution.location.state.toLowerCase().includes(filters.location.state.toLowerCase())) {
        return false;
      }

      // Filtro por localização (cidade)
      if (filters.location.city && !institution.location.city.toLowerCase().includes(filters.location.city.toLowerCase())) {
        return false;
      }

      // Filtro por tipo de curso
      if (filters.courseType && !institution.courseTypes.includes(filters.courseType)) {
        return false;
      }

      // Filtro por nome do curso
      if (filters.courseName) {
        const hasCourse = institution.availableCourses.some(course => 
          course.name.toLowerCase().includes(filters.courseName.toLowerCase())
        );
        if (!hasCourse) {
          return false;
        }
      }

      return true;
    });
  },

  // Buscar instituição por ID
  async getInstitutionById(id: string): Promise<Institution> {
    try {
      // TODO: Implementar chamada real para o backend
      // const response = await fetch(`${API_BASE_URL}/institutions/${id}`);
      // return await response.json();
      
      // Mock data por enquanto
      const institutions = this.getMockInstitutions();
      const institution = institutions.find(inst => inst.id === id);
      if (!institution) {
        throw new Error('Instituição não encontrada');
      }
      return institution;
    } catch (error) {
      console.error('Erro ao buscar instituição:', error);
      throw error;
    }
  },

  // Buscar IDs das instituições favoritas do localStorage
  getFavoriteIds(): string[] {
    try {
      const favorites = localStorage.getItem('vibeHack_favorites');
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error);
      return [];
    }
  },

  // Verificar se uma instituição é favorita
  isFavorite(institutionId: string): boolean {
    const favoriteIds = this.getFavoriteIds();
    return favoriteIds.includes(institutionId);
  },

  // Buscar instituições favoritas
  async getFavoriteInstitutions(): Promise<Institution[]> {
    try {
      const favoriteIds = this.getFavoriteIds();
      const allInstitutions = this.getMockInstitutions();
      return allInstitutions.filter(inst => favoriteIds.includes(inst.id));
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      throw error;
    }
  },

  // Adicionar/remover dos favoritos
  async toggleFavorite(institutionId: string): Promise<void> {
    try {
      const favoriteIds = this.getFavoriteIds();
      const isCurrentlyFavorite = favoriteIds.includes(institutionId);
      
      let newFavorites: string[];
      if (isCurrentlyFavorite) {
        // Remover dos favoritos
        newFavorites = favoriteIds.filter(id => id !== institutionId);
      } else {
        // Adicionar aos favoritos
        newFavorites = [...favoriteIds, institutionId];
      }
      
      localStorage.setItem('vibeHack_favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Erro ao alterar favorito:', error);
      throw error;
    }
  },

  // Buscar instituições para comparação
  async getInstitutionsForComparison(ids: string[]): Promise<Institution[]> {
    try {
      // TODO: Implementar chamada real para o backend
      // const response = await fetch(`${API_BASE_URL}/institutions/compare`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ ids }),
      // });
      // return await response.json();
      
      // Mock data por enquanto
      const institutions = this.getMockInstitutions();
      return institutions.filter(inst => ids.includes(inst.id));
    } catch (error) {
      console.error('Erro ao buscar instituições para comparação:', error);
      throw error;
    }
  },

  // Dados mockados para desenvolvimento
  getMockInstitutions(): Institution[] {
    return [
      {
        id: '1',
        name: 'Universidade Federal de São Paulo',
        description: 'Instituição pública de excelência com foco em pesquisa e inovação.',
        monthlyFee: 0,
        mecRating: 5,
        studentRating: 4.5,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Restaurante', 'Academia'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Sena Madureira, 1500 - Vila Clementino'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '1',
            name: 'Medicina',
            type: 'Bacharelado',
            duration: 12,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de medicina com excelente infraestrutura e corpo docente qualificado.'
          },
          {
            id: '2',
            name: 'Enfermagem',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de enfermagem com práticas em hospital universitário.'
          },
          {
            id: '3',
            name: 'Fisioterapia',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de fisioterapia com clínica escola própria.'
          },
          {
            id: '4',
            name: 'Biomedicina',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de biomedicina com laboratórios de pesquisa avançados.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.unifesp.br',
        phone: '(11) 3385-4000',
        email: 'contato@unifesp.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Hospital Universitário',
            description: 'Hospital próprio para práticas médicas',
            available: true
          }
        ],
        reviews: [
          {
            id: '1',
            author: 'João Silva',
            rating: 5,
            comment: 'Excelente instituição, professores muito competentes. O curso de Medicina superou todas as minhas expectativas.',
            date: '2024-01-15',
            course: 'Medicina',
            helpful: 12
          },
          {
            id: '2',
            author: 'Maria Santos',
            rating: 5,
            comment: 'Infraestrutura de primeira qualidade. O hospital universitário oferece excelentes oportunidades de prática.',
            date: '2024-02-10',
            course: 'Enfermagem',
            helpful: 8
          },
          {
            id: '3',
            author: 'Pedro Costa',
            rating: 4,
            comment: 'Bom curso de Fisioterapia, mas poderia ter mais equipamentos modernos.',
            date: '2024-03-05',
            course: 'Fisioterapia',
            helpful: 6
          }
        ],
        statistics: {
          totalStudents: 15000,
          graduationRate: 95,
          employmentRate: 88,
          averageSalary: 4500
        }
      },
      {
        id: '2',
        name: 'Pontifícia Universidade Católica de São Paulo',
        description: 'Universidade privada com tradição e qualidade de ensino.',
        monthlyFee: 2500,
        mecRating: 4,
        studentRating: 4.2,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Auditório'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Monte Alegre, 984 - Perdizes'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Tecnólogo'],
        availableCourses: [
          {
            id: '2',
            name: 'Direito',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 2500,
            shift: 'Noturno',
            mecRating: 4,
            description: 'Curso de direito com forte tradição e excelente mercado de trabalho.'
          },
          {
            id: '3',
            name: 'Administração',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2200,
            shift: 'Noturno',
            mecRating: 4,
            description: 'Curso de administração com foco em gestão empresarial.'
          },
          {
            id: '4',
            name: 'Psicologia',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 2800,
            shift: 'Noturno',
            mecRating: 4,
            description: 'Curso de psicologia com clínica escola e estágios supervisionados.'
          },
          {
            id: '5',
            name: 'Jornalismo',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2400,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de jornalismo com laboratórios de mídia e comunicação.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.pucsp.br',
        phone: '(11) 3670-8000',
        email: 'contato@pucsp.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Biblioteca Central',
            description: 'Uma das maiores bibliotecas universitárias do país',
            available: true
          }
        ],
        reviews: [
          {
            id: '2',
            author: 'Maria Santos',
            rating: 4,
            comment: 'Boa estrutura e professores qualificados. O curso de Direito tem excelente tradição.',
            date: '2024-02-10',
            course: 'Direito',
            helpful: 8
          },
          {
            id: '3',
            author: 'Carlos Lima',
            rating: 4,
            comment: 'Curso de Administração muito bom, professores com experiência no mercado.',
            date: '2024-01-20',
            course: 'Administração',
            helpful: 6
          },
          {
            id: '4',
            author: 'Ana Costa',
            rating: 5,
            comment: 'Psicologia é excelente aqui, clínica escola muito bem estruturada.',
            date: '2024-03-15',
            course: 'Psicologia',
            helpful: 10
          }
        ],
        statistics: {
          totalStudents: 25000,
          graduationRate: 92,
          employmentRate: 85,
          averageSalary: 3800
        }
      },
      {
        id: '3',
        name: 'Universidade de São Paulo',
        description: 'A maior e mais prestigiada universidade do Brasil.',
        monthlyFee: 0,
        mecRating: 5,
        studentRating: 4.8,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Restaurante', 'Academia', 'Clínica'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Av. Prof. Luciano Gualberto, 380 - Butantã'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '3',
            name: 'Engenharia Civil',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de engenharia civil com laboratórios de ponta e professores renomados.'
          },
          {
            id: '4',
            name: 'Engenharia Elétrica',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de engenharia elétrica com laboratórios modernos.'
          },
          {
            id: '5',
            name: 'Engenharia Mecânica',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de engenharia mecânica com oficinas e laboratórios especializados.'
          },
          {
            id: '6',
            name: 'Ciência da Computação',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de computação com foco em pesquisa e desenvolvimento.'
          },
          {
            id: '7',
            name: 'Física',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de física com laboratórios de pesquisa avançados.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.usp.br',
        phone: '(11) 3091-4000',
        email: 'contato@usp.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Pesquisas',
            description: 'Centro de pesquisas avançadas em engenharia',
            available: true
          }
        ],
        reviews: [
          {
            id: '3',
            author: 'Pedro Costa',
            rating: 5,
            comment: 'A melhor universidade do país, sem dúvidas! O curso de Engenharia Civil é excepcional.',
            date: '2024-03-05',
            course: 'Engenharia Civil',
            helpful: 25
          },
          {
            id: '4',
            author: 'Fernanda Silva',
            rating: 5,
            comment: 'Ciência da Computação na USP é incrível, laboratórios de ponta e professores renomados.',
            date: '2024-02-15',
            course: 'Ciência da Computação',
            helpful: 18
          },
          {
            id: '5',
            author: 'Roberto Lima',
            rating: 5,
            comment: 'Engenharia Elétrica com infraestrutura de primeira qualidade.',
            date: '2024-01-30',
            course: 'Engenharia Elétrica',
            helpful: 15
          }
        ],
        statistics: {
          totalStudents: 95000,
          graduationRate: 98,
          employmentRate: 95,
          averageSalary: 5200
        }
      },
      {
        id: '4',
        name: 'Universidade Federal do Rio de Janeiro',
        description: 'Instituição pública de excelência no Rio de Janeiro.',
        monthlyFee: 0,
        mecRating: 5,
        studentRating: 4.3,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Restaurante'],
        location: {
          state: 'RJ',
          city: 'Rio de Janeiro',
          address: 'Av. Pedro Calmon, 550 - Cidade Universitária'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '4',
            name: 'Medicina',
            type: 'Bacharelado',
            duration: 12,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de medicina com tradição e excelência.'
          },
          {
            id: '5',
            name: 'Engenharia Química',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de engenharia química com laboratórios especializados.'
          },
          {
            id: '6',
            name: 'Arquitetura e Urbanismo',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de arquitetura com ateliês e laboratórios de projeto.'
          },
          {
            id: '7',
            name: 'Letras',
            type: 'Licenciatura',
            duration: 8,
            monthlyFee: 0,
            shift: 'Noturno',
            mecRating: 4,
            description: 'Curso de letras com biblioteca especializada e laboratórios de línguas.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.ufrj.br',
        phone: '(21) 3938-9600',
        email: 'contato@ufrj.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Hospital Universitário',
            description: 'Hospital próprio para práticas médicas',
            available: true
          }
        ],
        reviews: [
          {
            id: '4',
            author: 'Ana Oliveira',
            rating: 4,
            comment: 'Ótima instituição, mas precisa melhorar a infraestrutura. O curso de Medicina é excelente.',
            date: '2024-01-20',
            course: 'Medicina',
            helpful: 15
          },
          {
            id: '5',
            author: 'Lucas Mendes',
            rating: 4,
            comment: 'Engenharia Química com bons laboratórios e professores qualificados.',
            date: '2024-02-25',
            course: 'Engenharia Química',
            helpful: 8
          },
          {
            id: '6',
            author: 'Carolina Santos',
            rating: 5,
            comment: 'Arquitetura é incrível aqui, ateliês muito bem equipados.',
            date: '2024-03-10',
            course: 'Arquitetura e Urbanismo',
            helpful: 12
          }
        ],
        statistics: {
          totalStudents: 45000,
          graduationRate: 94,
          employmentRate: 90,
          averageSalary: 4800
        }
      },
      {
        id: '5',
        name: 'Centro Universitário Senac',
        description: 'Instituição privada com foco em tecnologia e inovação.',
        monthlyFee: 1800,
        mecRating: 3,
        studentRating: 3.8,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Academia'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Dr. Vila Nova, 228 - Vila Buarque'
        },
        courseTypes: ['Tecnólogo', 'Bacharelado'],
        availableCourses: [
          {
            id: '5',
            name: 'Análise e Desenvolvimento de Sistemas',
            type: 'Tecnólogo',
            duration: 6,
            monthlyFee: 1800,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso focado em desenvolvimento de software e tecnologia.'
          },
          {
            id: '6',
            name: 'Gestão da Tecnologia da Informação',
            type: 'Tecnólogo',
            duration: 6,
            monthlyFee: 1600,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de gestão em TI com foco em administração de sistemas.'
          },
          {
            id: '7',
            name: 'Design Gráfico',
            type: 'Tecnólogo',
            duration: 6,
            monthlyFee: 1700,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de design gráfico com laboratórios de criação digital.'
          },
          {
            id: '8',
            name: 'Marketing Digital',
            type: 'Tecnólogo',
            duration: 6,
            monthlyFee: 1500,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de marketing digital com foco em estratégias online.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.sp.senac.br',
        phone: '(11) 2187-4000',
        email: 'contato@sp.senac.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Inovação',
            description: 'Espaço para desenvolvimento de projetos inovadores',
            available: true
          }
        ],
        reviews: [
          {
            id: '5',
            author: 'Carlos Silva',
            rating: 4,
            comment: 'Bom curso para quem quer trabalhar com tecnologia. Análise de Sistemas é muito prático.',
            date: '2024-02-15',
            course: 'Análise e Desenvolvimento de Sistemas',
            helpful: 8
          },
          {
            id: '6',
            author: 'Mariana Costa',
            rating: 3,
            comment: 'Design Gráfico tem boa estrutura, mas poderia ter mais equipamentos.',
            date: '2024-01-25',
            course: 'Design Gráfico',
            helpful: 5
          },
          {
            id: '7',
            author: 'Diego Almeida',
            rating: 4,
            comment: 'Marketing Digital é atual e com bons professores.',
            date: '2024-03-08',
            course: 'Marketing Digital',
            helpful: 7
          }
        ],
        statistics: {
          totalStudents: 8000,
          graduationRate: 85,
          employmentRate: 78,
          averageSalary: 3200
        }
      },
      {
        id: '6',
        name: 'Universidade Federal de Minas Gerais',
        description: 'Uma das principais universidades públicas de Minas Gerais.',
        monthlyFee: 0,
        mecRating: 4,
        studentRating: 4.1,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Restaurante', 'Auditório'],
        location: {
          state: 'MG',
          city: 'Belo Horizonte',
          address: 'Av. Antônio Carlos, 6627 - Pampulha'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '6',
            name: 'Engenharia de Produção',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de engenharia com foco em produção e gestão.'
          },
          {
            id: '7',
            name: 'Medicina Veterinária',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de medicina veterinária com hospital veterinário próprio.'
          },
          {
            id: '8',
            name: 'Odontologia',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de odontologia com clínica escola bem estruturada.'
          },
          {
            id: '9',
            name: 'Farmácia',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de farmácia com laboratórios de análise e controle de qualidade.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.ufmg.br',
        phone: '(31) 3409-5000',
        email: 'contato@ufmg.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Pesquisas',
            description: 'Centro de pesquisas em engenharia',
            available: true
          }
        ],
        reviews: [
          {
            id: '6',
            author: 'Fernanda Costa',
            rating: 4,
            comment: 'Boa universidade, professores qualificados. Engenharia de Produção é muito bem estruturado.',
            date: '2024-03-10',
            course: 'Engenharia de Produção',
            helpful: 12
          },
          {
            id: '7',
            author: 'Ricardo Alves',
            rating: 5,
            comment: 'Medicina Veterinária é excelente, hospital veterinário de primeira qualidade.',
            date: '2024-02-18',
            course: 'Medicina Veterinária',
            helpful: 9
          },
          {
            id: '8',
            author: 'Patrícia Lima',
            rating: 4,
            comment: 'Odontologia tem boa estrutura, clínica escola bem organizada.',
            date: '2024-01-30',
            course: 'Odontologia',
            helpful: 7
          }
        ],
        statistics: {
          totalStudents: 35000,
          graduationRate: 92,
          employmentRate: 87,
          averageSalary: 4100
        }
      },
      {
        id: '7',
        name: 'Universidade Federal do Rio Grande do Sul',
        description: 'Instituição pública de excelência no sul do Brasil.',
        monthlyFee: 0,
        mecRating: 5,
        studentRating: 4.4,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Restaurante', 'Academia', 'Auditório'],
        location: {
          state: 'RS',
          city: 'Porto Alegre',
          address: 'Av. Paulo Gama, 110 - Farroupilha'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '7',
            name: 'Administração',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Noturno',
            mecRating: 5,
            description: 'Curso de administração com forte tradição e mercado de trabalho.'
          },
          {
            id: '8',
            name: 'Ciências Contábeis',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Noturno',
            mecRating: 5,
            description: 'Curso de contabilidade com laboratórios de informática contábil.'
          },
          {
            id: '9',
            name: 'Economia',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Noturno',
            mecRating: 5,
            description: 'Curso de economia com foco em análise econômica e mercado financeiro.'
          },
          {
            id: '10',
            name: 'Direito',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Noturno',
            mecRating: 5,
            description: 'Curso de direito com tradição e excelente mercado de trabalho.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.ufrgs.br',
        phone: '(51) 3308-6000',
        email: 'contato@ufrgs.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Estudos',
            description: 'Centro de estudos em administração e negócios',
            available: true
          }
        ],
        reviews: [
          {
            id: '7',
            author: 'Roberto Lima',
            rating: 5,
            comment: 'Excelente universidade, infraestrutura de primeira. Administração é excepcional.',
            date: '2024-02-28',
            course: 'Administração',
            helpful: 18
          },
          {
            id: '8',
            author: 'Juliana Silva',
            rating: 5,
            comment: 'Ciências Contábeis com excelente estrutura e professores.',
            date: '2024-01-15',
            course: 'Ciências Contábeis',
            helpful: 12
          },
          {
            id: '9',
            author: 'Marcelo Costa',
            rating: 4,
            comment: 'Economia é muito boa, mas poderia ter mais laboratórios.',
            date: '2024-03-12',
            course: 'Economia',
            helpful: 9
          }
        ],
        statistics: {
          totalStudents: 28000,
          graduationRate: 96,
          employmentRate: 92,
          averageSalary: 4600
        }
      },
      {
        id: '8',
        name: 'Universidade Estadual de Campinas',
        description: 'Universidade pública de excelência em pesquisa e inovação.',
        monthlyFee: 0,
        mecRating: 5,
        studentRating: 4.6,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Restaurante', 'Academia', 'Clínica', 'Auditório'],
        location: {
          state: 'SP',
          city: 'Campinas',
          address: 'Rua Cândido Rondon, 501 - Cidade Universitária'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '8',
            name: 'Ciência da Computação',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de computação com foco em pesquisa e desenvolvimento.'
          },
          {
            id: '9',
            name: 'Engenharia de Computação',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de engenharia de computação com laboratórios de hardware e software.'
          },
          {
            id: '10',
            name: 'Matemática',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de matemática com foco em pesquisa e desenvolvimento matemático.'
          },
          {
            id: '11',
            name: 'Química',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 5,
            description: 'Curso de química com laboratórios de pesquisa avançados.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.unicamp.br',
        phone: '(19) 3521-1000',
        email: 'contato@unicamp.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Computação',
            description: 'Centro de computação e tecnologia da informação',
            available: true
          }
        ],
        reviews: [
          {
            id: '8',
            author: 'Lucas Mendes',
            rating: 5,
            comment: 'Uma das melhores universidades para tecnologia no Brasil. Ciência da Computação é excepcional.',
            date: '2024-01-30',
            course: 'Ciência da Computação',
            helpful: 22
          },
          {
            id: '9',
            author: 'Gabriel Santos',
            rating: 5,
            comment: 'Engenharia de Computação com laboratórios de ponta e professores renomados.',
            date: '2024-02-20',
            course: 'Engenharia de Computação',
            helpful: 16
          },
          {
            id: '10',
            author: 'Amanda Costa',
            rating: 5,
            comment: 'Matemática é incrível aqui, pesquisa de alto nível.',
            date: '2024-03-05',
            course: 'Matemática',
            helpful: 14
          }
        ],
        statistics: {
          totalStudents: 32000,
          graduationRate: 97,
          employmentRate: 94,
          averageSalary: 5100
        }
      },
      {
        id: '9',
        name: 'Universidade Federal de Pernambuco',
        description: 'Instituição pública de destaque no nordeste brasileiro.',
        monthlyFee: 0,
        mecRating: 4,
        studentRating: 4.0,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Restaurante'],
        location: {
          state: 'PE',
          city: 'Recife',
          address: 'Av. Prof. Moraes Rego, 1235 - Cidade Universitária'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '9',
            name: 'Arquitetura e Urbanismo',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de arquitetura com foco em urbanismo e sustentabilidade.'
          },
          {
            id: '10',
            name: 'Design',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de design com ateliês e laboratórios de criação.'
          },
          {
            id: '11',
            name: 'Engenharia Civil',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de engenharia civil com laboratórios de estruturas e materiais.'
          },
          {
            id: '12',
            name: 'Geografia',
            type: 'Licenciatura',
            duration: 8,
            monthlyFee: 0,
            shift: 'Noturno',
            mecRating: 4,
            description: 'Curso de geografia com laboratórios de cartografia e geoprocessamento.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.ufpe.br',
        phone: '(81) 2126-8000',
        email: 'contato@ufpe.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Artes',
            description: 'Centro de artes e arquitetura',
            available: true
          }
        ],
        reviews: [
          {
            id: '9',
            author: 'Patrícia Santos',
            rating: 4,
            comment: 'Boa universidade, mas precisa de mais investimento. Arquitetura é muito boa.',
            date: '2024-03-15',
            course: 'Arquitetura e Urbanismo',
            helpful: 10
          },
          {
            id: '10',
            author: 'Rafael Mendes',
            rating: 4,
            comment: 'Design tem boa estrutura, ateliês bem equipados.',
            date: '2024-02-08',
            course: 'Design',
            helpful: 7
          },
          {
            id: '11',
            author: 'Camila Lima',
            rating: 4,
            comment: 'Engenharia Civil com laboratórios adequados.',
            date: '2024-01-25',
            course: 'Engenharia Civil',
            helpful: 6
          }
        ],
        statistics: {
          totalStudents: 22000,
          graduationRate: 89,
          employmentRate: 82,
          averageSalary: 3800
        }
      },
      {
        id: '10',
        name: 'Universidade Federal de Brasília',
        description: 'Universidade pública federal na capital do Brasil.',
        monthlyFee: 0,
        mecRating: 4,
        studentRating: 4.2,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Restaurante', 'Academia'],
        location: {
          state: 'DF',
          city: 'Brasília',
          address: 'Campus Universitário Darcy Ribeiro - Asa Norte'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '10',
            name: 'Relações Internacionais',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de relações internacionais com foco em diplomacia.'
          },
          {
            id: '11',
            name: 'Direito',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Noturno',
            mecRating: 4,
            description: 'Curso de direito com foco em direito público e internacional.'
          },
          {
            id: '12',
            name: 'Jornalismo',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Noturno',
            mecRating: 4,
            description: 'Curso de jornalismo com laboratórios de mídia e comunicação.'
          },
          {
            id: '13',
            name: 'Administração Pública',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Noturno',
            mecRating: 4,
            description: 'Curso de administração pública com foco em gestão governamental.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.unb.br',
        phone: '(61) 3107-3300',
        email: 'contato@unb.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Estudos Internacionais',
            description: 'Centro de estudos em relações internacionais',
            available: true
          }
        ],
        reviews: [
          {
            id: '10',
            author: 'Gabriel Costa',
            rating: 4,
            comment: 'Ótima universidade para quem quer trabalhar com diplomacia. Relações Internacionais é excelente.',
            date: '2024-02-20',
            course: 'Relações Internacionais',
            helpful: 14
          },
          {
            id: '11',
            author: 'Isabela Santos',
            rating: 4,
            comment: 'Direito com foco em direito público, muito bom para concursos.',
            date: '2024-01-18',
            course: 'Direito',
            helpful: 11
          },
          {
            id: '12',
            author: 'Thiago Lima',
            rating: 4,
            comment: 'Jornalismo com boa estrutura e professores experientes.',
            date: '2024-03-08',
            course: 'Jornalismo',
            helpful: 8
          }
        ],
        statistics: {
          totalStudents: 18000,
          graduationRate: 91,
          employmentRate: 86,
          averageSalary: 4200
        }
      },
      {
        id: '11',
        name: 'Universidade Federal do Paraná',
        description: 'Instituição pública de excelência no estado do Paraná.',
        monthlyFee: 0,
        mecRating: 4,
        studentRating: 4.1,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Restaurante', 'Auditório'],
        location: {
          state: 'PR',
          city: 'Curitiba',
          address: 'Rua XV de Novembro, 1299 - Centro'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '11',
            name: 'Engenharia Elétrica',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de engenharia elétrica com laboratórios modernos.'
          },
          {
            id: '12',
            name: 'Engenharia Mecânica',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de engenharia mecânica com oficinas e laboratórios especializados.'
          },
          {
            id: '13',
            name: 'Engenharia Química',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de engenharia química com laboratórios de processos industriais.'
          },
          {
            id: '14',
            name: 'Engenharia de Alimentos',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de engenharia de alimentos com laboratórios de processamento.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.ufpr.br',
        phone: '(41) 3310-2600',
        email: 'contato@ufpr.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Engenharia',
            description: 'Centro de engenharia e tecnologia',
            available: true
          }
        ],
        reviews: [
          {
            id: '11',
            author: 'Diego Almeida',
            rating: 4,
            comment: 'Boa universidade, professores experientes. Engenharia Elétrica é muito boa.',
            date: '2024-01-25',
            course: 'Engenharia Elétrica',
            helpful: 11
          },
          {
            id: '12',
            author: 'Vanessa Costa',
            rating: 4,
            comment: 'Engenharia Mecânica com boa estrutura e laboratórios.',
            date: '2024-02-12',
            course: 'Engenharia Mecânica',
            helpful: 8
          },
          {
            id: '13',
            author: 'Bruno Silva',
            rating: 4,
            comment: 'Engenharia Química com laboratórios bem equipados.',
            date: '2024-03-18',
            course: 'Engenharia Química',
            helpful: 6
          }
        ],
        statistics: {
          totalStudents: 26000,
          graduationRate: 90,
          employmentRate: 84,
          averageSalary: 4000
        }
      },
      {
        id: '12',
        name: 'Universidade Federal de Santa Catarina',
        description: 'Universidade pública de destaque em Santa Catarina.',
        monthlyFee: 0,
        mecRating: 4,
        studentRating: 4.3,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Restaurante', 'Academia'],
        location: {
          state: 'SC',
          city: 'Florianópolis',
          address: 'Campus Universitário Trindade - Centro'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '12',
            name: 'Oceanografia',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de oceanografia com acesso ao mar e laboratórios especializados.'
          },
          {
            id: '13',
            name: 'Engenharia de Pesca',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de engenharia de pesca com laboratórios de aquicultura.'
          },
          {
            id: '14',
            name: 'Biotecnologia',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de biotecnologia com laboratórios de pesquisa avançados.'
          },
          {
            id: '15',
            name: 'Ciências Biológicas',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 0,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de ciências biológicas com laboratórios de biodiversidade.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.ufsc.br',
        phone: '(48) 3721-9000',
        email: 'contato@ufsc.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Ciências do Mar',
            description: 'Centro de estudos marinhos e oceanográficos',
            available: true
          }
        ],
        reviews: [
          {
            id: '12',
            author: 'Marina Silva',
            rating: 4,
            comment: 'Excelente para quem quer estudar o mar e oceanos. Oceanografia é incrível.',
            date: '2024-03-08',
            course: 'Oceanografia',
            helpful: 16
          },
          {
            id: '13',
            author: 'André Costa',
            rating: 4,
            comment: 'Engenharia de Pesca com boa estrutura e acesso ao mar.',
            date: '2024-02-15',
            course: 'Engenharia de Pesca',
            helpful: 9
          },
          {
            id: '14',
            author: 'Carolina Mendes',
            rating: 5,
            comment: 'Biotecnologia com laboratórios de ponta e pesquisa avançada.',
            date: '2024-01-30',
            course: 'Biotecnologia',
            helpful: 12
          }
        ],
        statistics: {
          totalStudents: 24000,
          graduationRate: 93,
          employmentRate: 88,
          averageSalary: 4300
        }
      },
      {
        id: '13',
        name: 'Universidade Presbiteriana Mackenzie',
        description: 'Universidade privada com tradição centenária e excelência acadêmica.',
        monthlyFee: 3200,
        mecRating: 4,
        studentRating: 4.1,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Auditório', 'Academia'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua da Consolação, 930 - Consolação'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '13',
            name: 'Engenharia Civil',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 3200,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de engenharia civil com forte tradição e laboratórios modernos.'
          },
          {
            id: '14',
            name: 'Engenharia Elétrica',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 3200,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de engenharia elétrica com laboratórios de eletrônica e energia.'
          },
          {
            id: '15',
            name: 'Engenharia Mecânica',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 3200,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de engenharia mecânica com oficinas e laboratórios especializados.'
          },
          {
            id: '16',
            name: 'Arquitetura e Urbanismo',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 3500,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de arquitetura com ateliês e laboratórios de projeto.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.mackenzie.br',
        phone: '(11) 2114-8000',
        email: 'contato@mackenzie.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Engenharia',
            description: 'Centro de engenharia com laboratórios de ponta',
            available: true
          }
        ],
        reviews: [
          {
            id: '13',
            author: 'Rafael Mendes',
            rating: 4,
            comment: 'Excelente instituição, professores muito competentes. Engenharia Civil é excepcional.',
            date: '2024-02-15',
            course: 'Engenharia Civil',
            helpful: 18
          },
          {
            id: '14',
            author: 'Daniel Costa',
            rating: 4,
            comment: 'Engenharia Elétrica com laboratórios modernos e professores experientes.',
            date: '2024-01-20',
            course: 'Engenharia Elétrica',
            helpful: 12
          },
          {
            id: '15',
            author: 'Luisa Santos',
            rating: 5,
            comment: 'Arquitetura é incrível aqui, ateliês muito bem equipados.',
            date: '2024-03-10',
            course: 'Arquitetura e Urbanismo',
            helpful: 15
          }
        ],
        statistics: {
          totalStudents: 28000,
          graduationRate: 94,
          employmentRate: 89,
          averageSalary: 4200
        }
      },
      {
        id: '14',
        name: 'Universidade Anhembi Morumbi',
        description: 'Universidade privada com foco em inovação e mercado de trabalho.',
        monthlyFee: 2800,
        mecRating: 3,
        studentRating: 3.9,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Academia'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Casa do Ator, 275 - Vila Olímpia'
        },
        courseTypes: ['Bacharelado', 'Tecnólogo'],
        availableCourses: [
          {
            id: '14',
            name: 'Administração de Empresas',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2800,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de administração com foco em gestão empresarial.'
          },
          {
            id: '15',
            name: 'Marketing',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2600,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de marketing com foco em estratégias de mercado.'
          },
          {
            id: '16',
            name: 'Gestão de Recursos Humanos',
            type: 'Tecnólogo',
            duration: 6,
            monthlyFee: 2400,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de gestão de RH com foco em desenvolvimento de pessoas.'
          },
          {
            id: '17',
            name: 'Logística',
            type: 'Tecnólogo',
            duration: 6,
            monthlyFee: 2200,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de logística com foco em gestão da cadeia de suprimentos.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.anhembi.br',
        phone: '(11) 3293-2000',
        email: 'contato@anhembi.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Negócios',
            description: 'Centro de negócios e empreendedorismo',
            available: true
          }
        ],
        reviews: [
          {
            id: '14',
            author: 'Carolina Lima',
            rating: 4,
            comment: 'Boa estrutura e professores com experiência no mercado. Administração é muito boa.',
            date: '2024-01-20',
            course: 'Administração de Empresas',
            helpful: 12
          },
          {
            id: '15',
            author: 'Felipe Santos',
            rating: 4,
            comment: 'Marketing com foco prático e professores do mercado.',
            date: '2024-02-25',
            course: 'Marketing',
            helpful: 8
          },
          {
            id: '16',
            author: 'Renata Costa',
            rating: 3,
            comment: 'Gestão de RH é boa, mas poderia ter mais práticas.',
            date: '2024-03-12',
            course: 'Gestão de Recursos Humanos',
            helpful: 6
          }
        ],
        statistics: {
          totalStudents: 15000,
          graduationRate: 88,
          employmentRate: 82,
          averageSalary: 3800
        }
      },
      {
        id: '15',
        name: 'Universidade Paulista',
        description: 'Uma das maiores universidades privadas do Brasil com múltiplos campi.',
        monthlyFee: 1500,
        mecRating: 3,
        studentRating: 3.7,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Dr. Bacelar, 1212 - Vila Clementino'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Tecnólogo'],
        availableCourses: [
          {
            id: '15',
            name: 'Sistemas de Informação',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 1500,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de sistemas de informação com foco em tecnologia.'
          },
          {
            id: '16',
            name: 'Análise e Desenvolvimento de Sistemas',
            type: 'Tecnólogo',
            duration: 6,
            monthlyFee: 1400,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de análise e desenvolvimento de sistemas.'
          },
          {
            id: '17',
            name: 'Gestão da Tecnologia da Informação',
            type: 'Tecnólogo',
            duration: 6,
            monthlyFee: 1300,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de gestão em TI com foco em administração de sistemas.'
          },
          {
            id: '18',
            name: 'Administração',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 1200,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de administração com foco em gestão empresarial.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.unip.br',
        phone: '(11) 5586-4000',
        email: 'contato@unip.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Tecnologia',
            description: 'Centro de tecnologia e informática',
            available: true
          }
        ],
        reviews: [
          {
            id: '15',
            author: 'Thiago Santos',
            rating: 3,
            comment: 'Instituição com boa relação custo-benefício. Sistemas de Informação é adequado.',
            date: '2024-03-10',
            course: 'Sistemas de Informação',
            helpful: 8
          },
          {
            id: '16',
            author: 'Marcos Lima',
            rating: 3,
            comment: 'Análise de Sistemas é prático e com boa relação custo-benefício.',
            date: '2024-02-18',
            course: 'Análise e Desenvolvimento de Sistemas',
            helpful: 6
          },
          {
            id: '17',
            author: 'Julia Costa',
            rating: 3,
            comment: 'Administração é básica, mas atende às necessidades.',
            date: '2024-01-25',
            course: 'Administração',
            helpful: 5
          }
        ],
        statistics: {
          totalStudents: 120000,
          graduationRate: 85,
          employmentRate: 78,
          averageSalary: 3200
        }
      },
      {
        id: '16',
        name: 'Universidade Cidade de São Paulo',
        description: 'Universidade privada com foco em saúde e ciências biológicas.',
        monthlyFee: 2200,
        mecRating: 4,
        studentRating: 4.0,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Clínica'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Cesário Galeno, 448 - Tatuapé'
        },
        courseTypes: ['Bacharelado', 'Licenciatura'],
        availableCourses: [
          {
            id: '16',
            name: 'Fisioterapia',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2200,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de fisioterapia com clínica própria e estágios.'
          },
          {
            id: '17',
            name: 'Enfermagem',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2000,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de enfermagem com hospital escola próprio.'
          },
          {
            id: '18',
            name: 'Nutrição',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2100,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de nutrição com clínica escola e laboratórios de análise.'
          },
          {
            id: '19',
            name: 'Farmácia',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2300,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de farmácia com laboratórios de análise e controle de qualidade.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.unicid.edu.br',
        phone: '(11) 2178-1200',
        email: 'contato@unicid.edu.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Clínica de Fisioterapia',
            description: 'Clínica própria para práticas de fisioterapia',
            available: true
          }
        ],
        reviews: [
          {
            id: '16',
            author: 'Juliana Costa',
            rating: 4,
            comment: 'Ótimo curso de fisioterapia com boa infraestrutura. Clínica escola muito bem estruturada.',
            date: '2024-02-28',
            course: 'Fisioterapia',
            helpful: 15
          },
          {
            id: '17',
            author: 'Roberto Silva',
            rating: 4,
            comment: 'Enfermagem com hospital escola próprio, excelente para práticas.',
            date: '2024-01-15',
            course: 'Enfermagem',
            helpful: 10
          },
          {
            id: '18',
            author: 'Ana Paula Lima',
            rating: 4,
            comment: 'Nutrição com laboratórios bem equipados e clínica escola.',
            date: '2024-03-20',
            course: 'Nutrição',
            helpful: 8
          }
        ],
        statistics: {
          totalStudents: 12000,
          graduationRate: 92,
          employmentRate: 87,
          averageSalary: 3600
        }
      },
      {
        id: '17',
        name: 'Universidade São Judas Tadeu',
        description: 'Universidade privada com tradição em ciências da saúde.',
        monthlyFee: 2400,
        mecRating: 4,
        studentRating: 4.2,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Clínica', 'Academia'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Taquari, 546 - Mooca'
        },
        courseTypes: ['Bacharelado', 'Licenciatura'],
        availableCourses: [
          {
            id: '17',
            name: 'Enfermagem',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2400,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de enfermagem com hospital escola próprio.'
          },
          {
            id: '18',
            name: 'Fisioterapia',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2500,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de fisioterapia com clínica escola própria.'
          },
          {
            id: '19',
            name: 'Nutrição',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2300,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de nutrição com clínica escola e laboratórios de análise.'
          },
          {
            id: '20',
            name: 'Farmácia',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2600,
            shift: 'Integral',
            mecRating: 4,
            description: 'Curso de farmácia com laboratórios de análise e controle de qualidade.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.usjt.br',
        phone: '(11) 2799-1677',
        email: 'contato@usjt.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Hospital Escola',
            description: 'Hospital escola próprio para práticas de enfermagem',
            available: true
          }
        ],
        reviews: [
          {
            id: '17',
            author: 'Amanda Silva',
            rating: 4,
            comment: 'Excelente curso de enfermagem com hospital próprio. Práticas muito bem estruturadas.',
            date: '2024-01-15',
            course: 'Enfermagem',
            helpful: 20
          },
          {
            id: '18',
            author: 'Carlos Mendes',
            rating: 4,
            comment: 'Fisioterapia com clínica escola própria, excelente para práticas.',
            date: '2024-02-10',
            course: 'Fisioterapia',
            helpful: 12
          },
          {
            id: '19',
            author: 'Fernanda Costa',
            rating: 4,
            comment: 'Nutrição com laboratórios bem equipados e clínica escola.',
            date: '2024-03-25',
            course: 'Nutrição',
            helpful: 9
          }
        ],
        statistics: {
          totalStudents: 18000,
          graduationRate: 95,
          employmentRate: 90,
          averageSalary: 3800
        }
      },
      {
        id: '18',
        name: 'Universidade Cruzeiro do Sul',
        description: 'Universidade privada com múltiplos campi e ampla oferta de cursos.',
        monthlyFee: 1600,
        mecRating: 3,
        studentRating: 3.8,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Galvão Bueno, 868 - Liberdade'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Tecnólogo'],
        availableCourses: [
          {
            id: '18',
            name: 'Pedagogia',
            type: 'Licenciatura',
            duration: 8,
            monthlyFee: 1600,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de pedagogia com foco em educação infantil e fundamental.'
          },
          {
            id: '19',
            name: 'Letras',
            type: 'Licenciatura',
            duration: 8,
            monthlyFee: 1500,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de letras com foco em língua portuguesa e literatura.'
          },
          {
            id: '20',
            name: 'História',
            type: 'Licenciatura',
            duration: 8,
            monthlyFee: 1400,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de história com foco em ensino e pesquisa histórica.'
          },
          {
            id: '21',
            name: 'Geografia',
            type: 'Licenciatura',
            duration: 8,
            monthlyFee: 1400,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de geografia com foco em ensino e análise geográfica.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.cruzeirodosul.edu.br',
        phone: '(11) 3385-3000',
        email: 'contato@cruzeirodosul.edu.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Educação',
            description: 'Centro de educação e formação de professores',
            available: true
          }
        ],
        reviews: [
          {
            id: '18',
            author: 'Fernando Oliveira',
            rating: 4,
            comment: 'Bom curso de pedagogia com boa relação custo-benefício.',
            date: '2024-03-05',
            helpful: 10
          }
        ],
        statistics: {
          totalStudents: 45000,
          graduationRate: 87,
          employmentRate: 80,
          averageSalary: 3000
        }
      },
      {
        id: '19',
        name: 'Universidade Nove de Julho',
        description: 'Universidade privada com foco em inovação e tecnologia.',
        monthlyFee: 1900,
        mecRating: 3,
        studentRating: 3.9,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Academia'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Vergueiro, 318 - Liberdade'
        },
        courseTypes: ['Bacharelado', 'Tecnólogo'],
        availableCourses: [
          {
            id: '19',
            name: 'Ciência da Computação',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 1900,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de ciência da computação com foco em desenvolvimento.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.uninove.br',
        phone: '(11) 2633-9000',
        email: 'contato@uninove.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Inovação Tecnológica',
            description: 'Centro de inovação e tecnologia da informação',
            available: true
          }
        ],
        reviews: [
          {
            id: '19',
            author: 'Marcelo Alves',
            rating: 4,
            comment: 'Bom curso de computação com laboratórios modernos.',
            date: '2024-02-12',
            helpful: 14
          }
        ],
        statistics: {
          totalStudents: 35000,
          graduationRate: 89,
          employmentRate: 83,
          averageSalary: 3500
        }
      },
      {
        id: '20',
        name: 'Universidade Metodista de São Paulo',
        description: 'Universidade privada com tradição metodista e excelência acadêmica.',
        monthlyFee: 2600,
        mecRating: 4,
        studentRating: 4.1,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento', 'Auditório'],
        location: {
          state: 'SP',
          city: 'São Bernardo do Campo',
          address: 'Rua do Sacramento, 230 - Rudge Ramos'
        },
        courseTypes: ['Bacharelado', 'Licenciatura', 'Pós-graduação'],
        availableCourses: [
          {
            id: '20',
            name: 'Teologia',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 2600,
            shift: 'Noturno',
            mecRating: 4,
            description: 'Curso de teologia com tradição metodista e formação humanística.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.metodista.br',
        phone: '(11) 4366-5000',
        email: 'contato@metodista.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Estudos Teológicos',
            description: 'Centro de estudos teológicos e humanísticos',
            available: true
          }
        ],
        reviews: [
          {
            id: '20',
            author: 'Ricardo Santos',
            rating: 4,
            comment: 'Excelente instituição com forte tradição metodista.',
            date: '2024-01-30',
            helpful: 16
          }
        ],
        statistics: {
          totalStudents: 22000,
          graduationRate: 93,
          employmentRate: 86,
          averageSalary: 3900
        }
      },
      {
        id: '21',
        name: 'Universidade Santo Amaro',
        description: 'Universidade privada com foco em ciências da saúde e humanas.',
        monthlyFee: 2000,
        mecRating: 3,
        studentRating: 3.7,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Prof. Enéas de Siqueira Neto, 340 - Jardim das Imbuias'
        },
        courseTypes: ['Bacharelado', 'Licenciatura'],
        availableCourses: [
          {
            id: '21',
            name: 'Psicologia',
            type: 'Bacharelado',
            duration: 10,
            monthlyFee: 2000,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de psicologia com clínica escola e estágios supervisionados.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.unisa.br',
        phone: '(11) 2141-8555',
        email: 'contato@unisa.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Clínica Escola de Psicologia',
            description: 'Clínica escola para práticas de psicologia',
            available: true
          }
        ],
        reviews: [
          {
            id: '21',
            author: 'Vanessa Lima',
            rating: 4,
            comment: 'Bom curso de psicologia com clínica escola. Práticas supervisionadas muito boas.',
            date: '2024-03-15',
            course: 'Psicologia',
            helpful: 11
          }
        ],
        statistics: {
          totalStudents: 18000,
          graduationRate: 88,
          employmentRate: 81,
          averageSalary: 3400
        }
      },
      {
        id: '22',
        name: 'Universidade Bandeirante de São Paulo',
        description: 'Universidade privada com foco em tecnologia e inovação.',
        monthlyFee: 1700,
        mecRating: 3,
        studentRating: 3.8,
        infrastructure: ['Biblioteca', 'Laboratórios', 'Wi-Fi', 'Estacionamento'],
        location: {
          state: 'SP',
          city: 'São Paulo',
          address: 'Rua Maria Cândida, 1813 - Vila Guilherme'
        },

        courseTypes: ['Bacharelado', 'Tecnólogo'],
        availableCourses: [
          {
            id: '22',
            name: 'Engenharia de Software',
            type: 'Bacharelado',
            duration: 8,
            monthlyFee: 1700,
            shift: 'Noturno',
            mecRating: 3,
            description: 'Curso de engenharia de software com foco em desenvolvimento ágil.'
          }
        ],
        images: ['https://via.placeholder.com/400x300'],
        website: 'https://www.uniban.br',
        phone: '(11) 2967-9000',
        email: 'contato@uniban.br',
        accreditation: {
          mec: true,
          validUntil: '2025-12-31'
        },
        facilities: [
          {
            name: 'Centro de Desenvolvimento',
            description: 'Centro de desenvolvimento de software e tecnologia',
            available: true
          }
        ],
        reviews: [
          {
            id: '22',
            author: 'Daniel Costa',
            rating: 4,
            comment: 'Bom curso de engenharia de software com boa relação custo-benefício. Foco em desenvolvimento ágil.',
            date: '2024-02-25',
            course: 'Engenharia de Software',
            helpful: 9
          }
        ],
        statistics: {
          totalStudents: 25000,
          graduationRate: 86,
          employmentRate: 79,
          averageSalary: 3300
        }
      }
    ];
  }
}; 