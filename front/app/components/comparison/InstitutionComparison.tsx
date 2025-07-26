import React, { useState, useEffect } from 'react';
import type { Institution } from '~/types/institution';
import { institutionService } from '~/services/institutionService';

interface InstitutionComparisonProps {
  institutionIds: string[];
}

export function InstitutionComparison({ institutionIds }: InstitutionComparisonProps) {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInstitutions();
  }, [institutionIds]);

  const loadInstitutions = async () => {
    setLoading(true);
    try {
      const data = await institutionService.getInstitutionsForComparison(institutionIds);
      setInstitutions(data);
    } catch (error) {
      console.error('Erro ao carregar instituições para comparação:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (institutions.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nenhuma instituição para comparar</h2>
        <p className="text-gray-600">Selecione pelo menos duas instituições para fazer uma comparação.</p>
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
      key: 'transportOptions',
      label: 'Transporte',
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
        return (
          <div className="flex items-center gap-1">
            {renderStars(value as number)}
            <span className="text-sm text-gray-600">({value}/5)</span>
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
          <div className="space-y-1 text-sm">
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
          Compare {institutions.length} instituições lado a lado
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[200px]">
                  Critério
                </th>
                {institutions.map(institution => (
                  <th key={institution.id} className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[300px]">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg mb-2">{institution.name}</h3>
                      <div className="h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-2"></div>
                      <p className="text-sm text-gray-600">
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
                  {institutions.map(institution => (
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

      {/* Resumo da comparação */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {institutions.map(institution => (
          <div key={institution.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">{institution.name}</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Mensalidade:</span>
                <span className="font-semibold text-green-600">
                  R$ {institution.monthlyFee.toLocaleString('pt-BR')}
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
              
              <div className="flex justify-between">
                <span className="text-gray-600">Transporte:</span>
                <span className="font-semibold">{institution.transportOptions.length} opções</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 