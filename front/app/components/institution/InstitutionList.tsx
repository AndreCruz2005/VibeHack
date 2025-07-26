import React, { useState, useEffect } from 'react';
import type { Institution } from '~/types/institution';
import { InstitutionCard } from './InstitutionCard';
import { institutionService } from '~/services/institutionService';

interface InstitutionListProps {
  filters: any;
  onViewDetails: (id: string) => void;
}

export function InstitutionList({ filters, onViewDetails }: InstitutionListProps) {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comparison, setComparison] = useState<string[]>([]);

  useEffect(() => {
    loadInstitutions();
  }, [filters]);

  const loadInstitutions = async () => {
    setLoading(true);
    try {
      // TODO: Implementar chamada real para o backend
      // const data = await institutionService.searchInstitutions(filters);
      const data = await institutionService.getMockInstitutions();
      setInstitutions(data);
    } catch (error) {
      console.error('Erro ao carregar instituições:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const handleCompare = (id: string) => {
    setComparison(prev => {
      if (prev.includes(id)) {
        return prev.filter(compId => compId !== id);
      }
      if (prev.length >= 3) {
        // Limita a 3 instituições para comparação
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
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
        <div className="text-gray-400 text-6xl mb-4">🏫</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Nenhuma instituição encontrada
        </h3>
        <p className="text-gray-500">
          Tente ajustar os filtros de busca para encontrar mais opções.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Informações da busca */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-blue-800">
          Encontradas <strong>{institutions.length}</strong> instituições
          {filters.searchTerm && ` para "${filters.searchTerm}"`}
        </p>
      </div>

      {/* Lista de instituições */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {institutions.map(institution => (
          <InstitutionCard
            key={institution.id}
            institution={institution}
            onViewDetails={onViewDetails}
            onAddToFavorites={handleAddToFavorites}
            onCompare={handleCompare}
            isFavorite={favorites.includes(institution.id)}
            isInComparison={comparison.includes(institution.id)}
          />
        ))}
      </div>

      {/* Indicador de comparação */}
      {comparison.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">
            Comparação ({comparison.length}/3)
          </p>
          <button
            onClick={() => {/* TODO: Navegar para página de comparação */}}
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
          >
            Comparar Agora
          </button>
        </div>
      )}
    </div>
  );
} 