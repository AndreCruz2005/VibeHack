import React from 'react';
import type { Institution } from '~/types/institution';

interface InstitutionCardProps {
  institution: Institution;
  onViewDetails: (id: string) => void;
  onAddToFavorites: (id: string) => void;
  onCompare: (id: string) => void;
  isFavorite: boolean;
  isInComparison: boolean;
}

export function InstitutionCard({
  institution,
  onViewDetails,
  onAddToFavorites,
  onCompare,
  isFavorite,
  isInComparison
}: InstitutionCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header com imagem e ações */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-xl font-bold">{institution.name}</h3>
            <p className="text-sm opacity-90">{institution.location.city}, {institution.location.state}</p>
          </div>
        </div>
        
        {/* Botões de ação */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onAddToFavorites(institution.id)}
            className={`p-2 rounded-full ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-red-50'
            } transition-colors`}
            title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <button
            onClick={() => onCompare(institution.id)}
            className={`p-2 rounded-full ${
              isInComparison 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-blue-50'
            } transition-colors`}
            title={isInComparison ? 'Remover da comparação' : 'Adicionar à comparação'}
          >
            {isInComparison ? '✓' : '⚖️'}
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-6">
        {/* Avaliações */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600">Avaliação MEC</p>
            <div className="flex items-center gap-1">
              {renderStars(institution.mecRating)}
              <span className="text-sm text-gray-600 ml-1">({institution.mecRating}/5)</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Avaliação Estudantes</p>
            <div className="flex items-center gap-1">
              {renderStars(institution.studentRating)}
              <span className="text-sm text-gray-600 ml-1">({institution.studentRating}/5)</span>
            </div>
          </div>
        </div>

        {/* Preço */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">Mensalidade</p>
          <p className="text-2xl font-bold text-green-600">
            R$ {institution.monthlyFee.toLocaleString('pt-BR')}
          </p>
        </div>

        {/* Infraestrutura */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Infraestrutura</p>
          <div className="flex flex-wrap gap-1">
            {institution.infrastructure.slice(0, 4).map((item: string) => (
              <span
                key={item}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {item}
              </span>
            ))}
            {institution.infrastructure.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{institution.infrastructure.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Transporte */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Transporte</p>
          <div className="flex flex-wrap gap-1">
            {institution.transportOptions.slice(0, 3).map((option: string) => (
              <span
                key={option}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {option}
              </span>
            ))}
            {institution.transportOptions.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{institution.transportOptions.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Botão ver detalhes */}
        <button
          onClick={() => onViewDetails(institution.id)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
} 