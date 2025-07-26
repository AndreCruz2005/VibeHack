import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import type { Institution } from '~/types/institution';
import { institutionService } from '~/services/institutionService';
import { useFavorites } from '~/contexts/FavoritesContext';

export function InstitutionDetails() {
  const { id } = useParams();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (id) {
      loadInstitution();
    }
  }, [id]);

  const loadInstitution = async () => {
    setLoading(true);
    try {
      const data = await institutionService.getInstitutionById(id!);
      setInstitution(data);
    } catch (error) {
      console.error('Erro ao carregar instituição:', error);
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

  const handleToggleFavorite = async () => {
    if (!id) return;
    await toggleFavorite(id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!institution) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Instituição não encontrada</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Voltar para a busca
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 relative">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{institution.name}</h1>
            <p className="text-xl opacity-90">
              {institution.location.city}, {institution.location.state}
            </p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  R$ {institution.monthlyFee.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">Mensalidade</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center gap-1">
                  {renderStars(institution.mecRating)}
                </div>
                <p className="text-sm text-gray-600">Avaliação MEC</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center gap-1">
                  {renderStars(institution.studentRating)}
                </div>
                <p className="text-sm text-gray-600">Avaliação Estudantes</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleToggleFavorite}
                className={`px-6 py-2 rounded-md transition-colors min-w-[180px] ${
                  isFavorite(id!) 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isFavorite(id!) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </button>
              <button 
                onClick={() => {
                  // Salvar a instituição atual no localStorage para comparação
                  localStorage.setItem('comparisonInstitutions', JSON.stringify([id]));
                  window.location.href = '/comparison';
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors min-w-[180px]"
              >
                Comparar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'courses', label: 'Cursos' },
              { id: 'infrastructure', label: 'Infraestrutura' },
              { id: 'reviews', label: 'Avaliações' },
              { id: 'statistics', label: 'Estatísticas' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Visão Geral */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Sobre a Instituição</h3>
                <p className="text-gray-700 leading-relaxed">{institution.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Informações de Contato</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Website:</strong> <a href={institution.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{institution.website}</a></p>
                    <p><strong>Telefone:</strong> {institution.phone}</p>
                    <p><strong>Email:</strong> {institution.email}</p>
                    <p><strong>Endereço:</strong> {institution.location.address}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Credenciamento</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>MEC:</strong> {institution.accreditation.mec ? '✅ Credenciada' : '❌ Não credenciada'}</p>
                    <p><strong>Válido até:</strong> {new Date(institution.accreditation.validUntil).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cursos */}
          {activeTab === 'courses' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Cursos Disponíveis</h3>
              <div className="space-y-4">
                {institution.availableCourses.map(course => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold">{course.name}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {course.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{course.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <strong>Duração:</strong> {course.duration} semestres
                      </div>
                      <div>
                        <strong>Turno:</strong> {course.shift}
                      </div>
                      <div>
                        <strong>Mensalidade:</strong> R$ {course.monthlyFee.toLocaleString('pt-BR')}
                      </div>
                      <div>
                        <strong>Avaliação MEC:</strong> {course.mecRating}/5
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Infraestrutura */}
          {activeTab === 'infrastructure' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Infraestrutura</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {institution.infrastructure.map(item => (
                  <div key={item} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="font-medium">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <h4 className="text-lg font-semibold mt-6 mb-3">Instalações Especiais</h4>
              <div className="space-y-3">
                {institution.facilities.map(facility => (
                  <div key={facility.name} className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold mb-1">{facility.name}</h5>
                    <p className="text-gray-600 text-sm">{facility.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Avaliações */}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Avaliações dos Estudantes</h3>
              <div className="space-y-4">
                {institution.reviews.map(review => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{review.author}</h4>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-600">({review.rating}/5)</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                        {review.course}
                      </span>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>👍 {review.helpful} pessoas acharam útil</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Estatísticas */}
          {activeTab === 'statistics' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Estatísticas da Instituição</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {institution.statistics.totalStudents.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-sm text-gray-600">Total de Estudantes</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {institution.statistics.graduationRate}%
                  </div>
                  <p className="text-sm text-gray-600">Taxa de Conclusão</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {institution.statistics.employmentRate}%
                  </div>
                  <p className="text-sm text-gray-600">Taxa de Empregabilidade</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    R$ {institution.statistics.averageSalary.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-sm text-gray-600">Salário Médio</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 