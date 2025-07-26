import React, { useState } from 'react';

interface SearchFiltersProps {
  onFiltersChange: (filters: FilterCriteria) => void;
}

export interface FilterCriteria {
  searchTerm: string;
  budget: {
    min: number;
    max: number;
  };
  mecRating: number;
  studentRating: number;
  infrastructure: string[];
  location: {
    state: string;
    city: string;
  };
  courseType: string;
  courseName: string;
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    searchTerm: '',
    budget: { min: 0, max: 10000 },
    mecRating: 0,
    studentRating: 0,
    infrastructure: [],
    location: { state: '', city: '' },
    courseType: '',
    courseName: ''
  });

  const handleFilterChange = (key: keyof FilterCriteria, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Função para verificar se há filtros ativos
  const hasActiveFilters = () => {
    return (
      filters.searchTerm !== '' ||
      filters.budget.min !== 0 ||
      filters.budget.max !== 10000 ||
      filters.mecRating > 0 ||
      filters.studentRating > 0 ||
      filters.infrastructure.length > 0 ||
      filters.location.state !== '' ||
      filters.location.city !== '' ||
      filters.courseType !== '' ||
      filters.courseName !== ''
    );
  };

  // Função para contar filtros ativos
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchTerm !== '') count++;
    if (filters.budget.min !== 0 || filters.budget.max !== 10000) count++;
    if (filters.mecRating > 0) count++;
    if (filters.studentRating > 0) count++;
    if (filters.infrastructure.length > 0) count++;
    if (filters.location.state !== '' || filters.location.city !== '') count++;
    if (filters.courseType !== '') count++;
    if (filters.courseName !== '') count++;
    return count;
  };

  const infrastructureOptions = [
    'Biblioteca',
    'Laboratórios',
    'Wi-Fi',
    'Estacionamento',
    'Restaurante',
    'Academia',
    'Auditório',
    'Clínica'
  ];



  const courseTypes = [
    'Bacharelado',
    'Licenciatura',
    'Tecnólogo',
    'Pós-graduação'
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Filtros de Busca</h2>
        {hasActiveFilters() && (
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {getActiveFiltersCount()} filtro{getActiveFiltersCount() !== 1 ? 's' : ''} ativo{getActiveFiltersCount() !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      
      {/* Busca por nome */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Buscar instituição
        </label>
        <input
          type="text"
          placeholder="Digite o nome da instituição..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
        />
      </div>

      {/* Orçamento */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Faixa de preço (R$)
        </label>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Mínimo"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.budget.min}
            onChange={(e) => handleFilterChange('budget', { ...filters.budget, min: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Máximo"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.budget.max}
            onChange={(e) => handleFilterChange('budget', { ...filters.budget, max: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Avaliação MEC */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Avaliação MEC (mínimo)
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.mecRating}
          onChange={(e) => handleFilterChange('mecRating', Number(e.target.value))}
        >
          <option value={0}>Qualquer avaliação</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={5}>5</option>
        </select>
      </div>

      {/* Avaliação dos estudantes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Avaliação dos estudantes (mínimo)
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.studentRating}
          onChange={(e) => handleFilterChange('studentRating', Number(e.target.value))}
        >
          <option value={0}>Qualquer avaliação</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={5}>5</option>
        </select>
      </div>

      {/* Tipo de curso */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de curso
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.courseType}
          onChange={(e) => handleFilterChange('courseType', e.target.value)}
        >
          <option value="">Todos os tipos</option>
          {courseTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Nome do curso */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome do curso
        </label>
        <input
          type="text"
          placeholder="Digite o nome do curso..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.courseName}
          onChange={(e) => handleFilterChange('courseName', e.target.value)}
        />
      </div>

      {/* Infraestrutura */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Infraestrutura
        </label>
        <div className="grid grid-cols-2 gap-2">
          {infrastructureOptions.map(option => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.infrastructure.includes(option)}
                onChange={(e) => {
                  const newInfra = e.target.checked
                    ? [...filters.infrastructure, option]
                    : filters.infrastructure.filter(item => item !== option);
                  handleFilterChange('infrastructure', newInfra);
                }}
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Localização */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Localização
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Estado
            </label>
            <input
              type="text"
              placeholder="Digite o estado..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.location.state}
              onChange={(e) => handleFilterChange('location', { ...filters.location, state: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Cidade
            </label>
            <input
              type="text"
              placeholder="Digite a cidade..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.location.city}
              onChange={(e) => handleFilterChange('location', { ...filters.location, city: e.target.value })}
            />
          </div>
        </div>
      </div>



      {/* Botão limpar filtros */}
      {hasActiveFilters() && (
        <button
          onClick={() => {
                      const resetFilters: FilterCriteria = {
            searchTerm: '',
            budget: { min: 0, max: 10000 },
            mecRating: 0,
            studentRating: 0,
            infrastructure: [],
            location: { state: '', city: '' },
            courseType: '',
            courseName: ''
          };
            setFilters(resetFilters);
            onFiltersChange(resetFilters);
          }}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          Limpar Filtros ({getActiveFiltersCount()})
        </button>
      )}
    </div>
  );
} 