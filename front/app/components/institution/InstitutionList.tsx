import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { Institution } from '~/types/institution';
import { InstitutionCard } from './InstitutionCard';
import { institutionService } from '~/services/institutionService';
import { useFavorites } from '~/contexts/FavoritesContext';
import { useComparison } from '~/contexts/ComparisonContext';

interface InstitutionListProps {
  filters: any;
  onViewDetails: (id: string) => void;
}

export function InstitutionList({ filters, onViewDetails }: InstitutionListProps) {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { comparison, addToComparison, removeFromComparison, clearComparison, isInComparison } = useComparison();

  useEffect(() => {
    loadInstitutions();
  }, [filters]);

  const loadInstitutions = async () => {
    setLoading(true);
    try {
      // Usar o método searchInstitutions que aplica os filtros
      const data = await institutionService.searchInstitutions(filters);
      setInstitutions(data);
    } catch (error) {
      console.error('Erro ao carregar instituições:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = async (id: string) => {
    await toggleFavorite(id);
  };

  const handleCompare = (id: string) => {
    if (comparison.includes(id)) {
      removeFromComparison(id);
    } else {
      addToComparison(id);
    }
  };

  const handleCompareNow = () => {
    // Salvar as instituições selecionadas no localStorage para a página de comparação
    localStorage.setItem('comparisonInstitutions', JSON.stringify(comparison));
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
          {institutions.length === 0 && (
            <span className="block mt-2 text-sm text-blue-600">
              Tente ajustar os filtros para encontrar mais opções.
            </span>
          )}
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
            isFavorite={isFavorite(institution.id)}
            isInComparison={isInComparison(institution.id)}
          />
        ))}
      </div>

      {/* Indicador de comparação */}
      {comparison.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
          <p className="font-semibold mb-2">
            Comparação ({comparison.length}/4)
          </p>
          <div className="flex gap-2">
            <Link
              to="/comparison"
              onClick={handleCompareNow}
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              Comparar Agora
            </Link>
            <button
              onClick={clearComparison}
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              Limpar
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 