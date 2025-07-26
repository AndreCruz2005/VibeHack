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
      
      // Mock data por enquanto
      return this.getMockInstitutions();
    } catch (error) {
      console.error('Erro ao buscar instituições:', error);
      throw error;
    }
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

  // Buscar instituições favoritas
  async getFavoriteInstitutions(): Promise<Institution[]> {
    try {
      // TODO: Implementar chamada real para o backend
      // const response = await fetch(`${API_BASE_URL}/institutions/favorites`);
      // return await response.json();
      
      // Mock data por enquanto
      return this.getMockInstitutions().slice(0, 3);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      throw error;
    }
  },

  // Adicionar/remover dos favoritos
  async toggleFavorite(institutionId: string): Promise<void> {
    try {
      // TODO: Implementar chamada real para o backend
      // await fetch(`${API_BASE_URL}/institutions/${institutionId}/favorite`, {
      //   method: 'POST',
      // });
      console.log('Toggle favorite:', institutionId);
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
        transportOptions: ['Ônibus', 'Metrô', 'Trem'],
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
            comment: 'Excelente instituição, professores muito competentes.',
            date: '2024-01-15',
            helpful: 12
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
        transportOptions: ['Ônibus', 'Metrô'],
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
            comment: 'Boa estrutura e professores qualificados.',
            date: '2024-02-10',
            helpful: 8
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
        transportOptions: ['Ônibus', 'Metrô', 'Trem', 'Bicicleta'],
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
            comment: 'A melhor universidade do país, sem dúvidas!',
            date: '2024-03-05',
            helpful: 25
          }
        ],
        statistics: {
          totalStudents: 95000,
          graduationRate: 98,
          employmentRate: 95,
          averageSalary: 5200
        }
      }
    ];
  }
}; 