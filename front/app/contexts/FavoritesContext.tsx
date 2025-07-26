import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { institutionService } from '~/services/institutionService';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (institutionId: string) => Promise<void>;
  isFavorite: (institutionId: string) => boolean;
  loadFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadFavorites = () => {
    const favoriteIds = institutionService.getFavoriteIds();
    setFavorites(favoriteIds);
  };

  const toggleFavorite = async (institutionId: string) => {
    try {
      await institutionService.toggleFavorite(institutionId);
      loadFavorites(); // Recarregar favoritos após a mudança
    } catch (error) {
      console.error('Erro ao alterar favorito:', error);
    }
  };

  const isFavorite = (institutionId: string) => {
    return favorites.includes(institutionId);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loadFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
} 