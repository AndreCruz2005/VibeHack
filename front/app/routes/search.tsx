import React, { useState } from 'react';
import { Header } from '~/components/layout/Header';
import { SearchFilters, type FilterCriteria } from '~/components/search/SearchFilters';
import { InstitutionList } from '~/components/institution/InstitutionList';

export function meta() {
  return [
    { title: "VibeHack - Buscar Instituições de Ensino Superior" },
    { name: "description", content: "Encontre a instituição de ensino superior ideal para você. Compare preços, avaliações, infraestrutura e muito mais." },
  ];
}

export default function SearchPage() {
  const [filters, setFilters] = useState<FilterCriteria>({
    searchTerm: '',
    budget: { min: 0, max: 10000 },
    mecRating: 0,
    studentRating: 0,
    infrastructure: [],
    location: { state: '', city: '' },
    transportOptions: [],
    courseType: ''
  });

  const handleFiltersChange = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (id: string) => {
    // TODO: Navegar para página de detalhes
    console.log('Ver detalhes da instituição:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Encontre sua Instituição Ideal
          </h1>
          <p className="text-gray-600">
            Compare instituições de ensino superior e encontre a que melhor se adapta às suas necessidades.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <SearchFilters onFiltersChange={handleFiltersChange} />
          </div>

          {/* Lista de instituições */}
          <div className="lg:col-span-3">
            <InstitutionList 
              filters={filters} 
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </main>
    </div>
  );
} 