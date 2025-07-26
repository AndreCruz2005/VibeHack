import React from 'react';
import { Header } from '~/components/layout/Header';
import { FavoritesList } from '~/components/favorites/FavoritesList';

export function meta() {
  return [
    { title: "VibeHack - Meus Favoritos" },
    { name: "description", content: "Suas instituições de ensino superior favoritas." },
  ];
}

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <FavoritesList />
    </div>
  );
} 