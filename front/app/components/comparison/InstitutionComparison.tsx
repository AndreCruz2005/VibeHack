import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { Institution } from '~/types/institution';
import { institutionService } from '~/services/institutionService';
import { useComparison } from '~/contexts/ComparisonContext';

export function InstitutionComparison() {
  const navigate = useNavigate();
  const [allInstitutions, setAllInstitutions] = useState<Institution[]>([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { comparison, addToComparison, removeFromComparison, clearComparison: clearContextComparison, isInComparison } = useComparison();

  useEffect(() => {
    loadAllInstitutions();
  }, [comparison]);

  const loadAllInstitutions = async () => {
    setLoading(true);
    try {
      const institutions = institutionService.getMockInstitutions();
      setAllInstitutions(institutions);
      
      // Carregar instituições do contexto de comparação
      if (comparison.length > 0) {
        const selectedInsts = institutions.filter(inst => comparison.includes(inst.id));
        setSelectedInstitutions(selectedInsts);
      }
    } catch (error) {
      console.error('Erro ao carregar instituições:', error);
    } finally {
      setLoading(false);
    }
  };

  const addInstitutionToComparison = (institution: Institution) => {
    addToComparison(institution.id);
  };

  const removeInstitutionFromComparison = (institutionId: string) => {
    removeFromComparison(institutionId);
  };

  const clearLocalComparison = () => {
    setSelectedInstitutions([]);
    clearContextComparison();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  const filteredInstitutions = allInstitutions.filter(institution =>
    institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.location.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const comparisonFields = [
    {
      key: 'name',
      label: 'Nome',
      type: 'text'
    },
    {
      key: 'monthlyFee',
      label: 'Mensalidade',
      type: 'currency'
    },
    {
      key: 'mecRating',
      label: 'Avaliação MEC',
      type: 'rating'
    },
    {
      key: 'studentRating',
      label: 'Avaliação Estudantes',
      type: 'rating'
    },
    {
      key: 'location',
      label: 'Localização',
      type: 'location'
    },
    {
      key: 'infrastructure',
      label: 'Infraestrutura',
      type: 'list'
    },

    {
      key: 'statistics',
      label: 'Estatísticas',
      type: 'statistics'
    }
  ];

  const renderFieldValue = (institution: Institution, field: any) => {
    const value = field.key === 'location' 
      ? institution.location 
      : institution[field.key as keyof Institution];

    switch (field.type) {
      case 'currency':
        return `R$ ${(value as number).toLocaleString('pt-BR')}`;
      case 'rating':
        const ratingValue = value as number;
        return (
          <div className="flex items-center gap-1">
            {renderStars(ratingValue)}
            <span className="text-sm !text-black">({ratingValue}/5)</span>
          </div>
        );
      case 'location':
        const location = value as { city: string; state: string };
        return `${location.city}, ${location.state}`;
      case 'list':
        const list = value as string[];
        return (
          <div className="flex flex-wrap gap-1">
            {list.slice(0, 3).map((item: string) => (
              <span
                key={item}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {item}
              </span>
            ))}
            {list.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{list.length - 3}
              </span>
            )}
          </div>
        );
      case 'statistics':
        const stats = value as {
          totalStudents: number;
          graduationRate: number;
          employmentRate: number;
          averageSalary: number;
        };
        return (
          <div className="space-y-1 text-sm !text-black">
            <div>Estudantes: {stats.totalStudents.toLocaleString('pt-BR')}</div>
            <div>Conclusão: {stats.graduationRate}%</div>
            <div>Empregabilidade: {stats.employmentRate}%</div>
            <div>Salário: R$ {stats.averageSalary.toLocaleString('pt-BR')}</div>
          </div>
        );
      default:
        return typeof value === 'string' ? value : JSON.stringify(value);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Comparação de Instituições</h1>
        <p className="text-gray-600">
          Selecione até 4 instituições para comparar lado a lado
        </p>
      </div>

      {/* Seletor de instituições */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Selecionar Instituições</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {selectedInstitutions.length}/4 selecionadas
            </span>
            {selectedInstitutions.length > 0 && (
              <button
                onClick={clearLocalComparison}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Limpar seleção
              </button>
            )}
          </div>
        </div>

        {/* Barra de busca */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar instituições por nome, cidade ou estado..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lista de instituições disponíveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filteredInstitutions.map(institution => {
            const isSelected = selectedInstitutions.find(inst => inst.id === institution.id);
            return (
              <div
                key={institution.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
                onClick={() => addInstitutionToComparison(institution)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{institution.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {institution.location.city}, {institution.location.state}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-green-600">
                        R$ {institution.monthlyFee === 0 ? 'Gratuito' : institution.monthlyFee.toLocaleString('pt-BR')}
                      </span>
                      <div className="flex items-center gap-1">
                        {renderStars(institution.mecRating)}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="ml-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-xs rounded-full">
                        ✓
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparação */}
      {selectedInstitutions.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Comparação ({selectedInstitutions.length} instituições)
              </h2>
              <button
                onClick={clearLocalComparison}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Limpar comparação
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[200px]">
                    Critério
                  </th>
                  {selectedInstitutions.map(institution => (
                    <th key={institution.id} className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[300px]">
                      <div className="text-center">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{institution.name}</h3>
                          <button
                            onClick={() => removeInstitutionFromComparison(institution.id)}
                            className="text-red-500 hover:text-red-700 text-lg font-bold"
                          >
                            ×
                          </button>
                        </div>
                        <div className="h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-2"></div>
                        <p className="text-sm !text-black">
                          {institution.location.city}, {institution.location.state}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonFields.map(field => (
                  <tr key={field.key} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      {field.label}
                    </td>
                    {selectedInstitutions.map(institution => (
                      <td key={institution.id} className="px-6 py-4 text-sm text-gray-900">
                        {renderFieldValue(institution, field)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resumo da comparação */}
      {selectedInstitutions.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {selectedInstitutions.map(institution => (
            <div key={institution.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">{institution.name}</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mensalidade:</span>
                  <span className="font-semibold text-green-600">
                    R$ {institution.monthlyFee === 0 ? 'Gratuito' : institution.monthlyFee.toLocaleString('pt-BR')}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Avaliação MEC:</span>
                  <div className="flex items-center gap-1">
                    {renderStars(institution.mecRating)}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Avaliação Estudantes:</span>
                  <div className="flex items-center gap-1">
                    {renderStars(institution.studentRating)}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Infraestrutura:</span>
                  <span className="font-semibold">{institution.infrastructure.length} itens</span>
                </div>
                

              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => navigate(`/institution/${institution.id}`)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensagem quando nenhuma instituição está selecionada */}
      {selectedInstitutions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nenhuma instituição selecionada</h2>
          <p className="text-gray-600 mb-6">
            Selecione pelo menos uma instituição acima para começar a comparação.
          </p>
          <div className="text-sm text-gray-500">
            <p>• Você pode comparar até 4 instituições por vez</p>
            <p>• Use a barra de busca para encontrar instituições específicas</p>
            <p>• Clique em uma instituição para adicioná-la à comparação</p>
          </div>
        </div>
      )}
    </div>
  );
} 