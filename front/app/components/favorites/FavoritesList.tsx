import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { Institution } from '~/types/institution';
import { InstitutionCard } from '../institution/InstitutionCard';
import { institutionService } from '~/services/institutionService';
import { useFavorites } from '~/contexts/FavoritesContext';

export function FavoritesList() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite, favorites: favoriteIds } = useFavorites();

  useEffect(() => {
    loadFavorites();
  }, [favoriteIds]); // Recarregar quando os favoritos mudarem

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const data = await institutionService.getFavoriteInstitutions();
      setFavorites(data);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    await toggleFavorite(id);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/institution/${id}`);
  };

  const handleCompare = (id: string) => {
    // TODO: Adicionar à comparação
    console.log('Comparar:', id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">❤️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nenhum favorito ainda</h2>
        <p className="text-gray-600 mb-6">
          Adicione instituições aos seus favoritos para encontrá-las facilmente aqui.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
          Buscar Instituições
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Meus Favoritos</h1>
        <p className="text-gray-600">
          {favorites.length} instituição{favorites.length !== 1 ? 'ões' : ''} favorita{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(institution => (
          <InstitutionCard
            key={institution.id}
            institution={institution}
            onViewDetails={handleViewDetails}
            onAddToFavorites={handleRemoveFavorite}
            onCompare={handleCompare}
            isFavorite={isFavorite(institution.id)}
            isInComparison={false}
          />
        ))}
      </div>
    </div>
  );
} 