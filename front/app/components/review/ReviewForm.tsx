import React, { useState } from 'react';

interface ReviewFormProps {
  institutionId: string;
  institutionName: string;
  onSubmit: (review: ReviewData) => void;
  onCancel: () => void;
}

interface ReviewData {
  rating: number;
  comment: string;
  course?: string;
  helpful: boolean;
}

export function ReviewForm({ institutionId, institutionName, onSubmit, onCancel }: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewData>({
    rating: 0,
    comment: '',
    course: '',
    helpful: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    const newErrors: Record<string, string> = {};
    if (formData.rating === 0) {
      newErrors.rating = 'Por favor, selecione uma avaliação';
    }
    if (formData.comment.trim().length < 10) {
      newErrors.comment = 'O comentário deve ter pelo menos 10 caracteres';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.rating;
        return newErrors;
      });
    }
  };

  const handleCommentChange = (comment: string) => {
    setFormData(prev => ({ ...prev, comment }));
    if (errors.comment) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.comment;
        return newErrors;
      });
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => interactive && handleRatingChange(i + 1)}
        className={`text-2xl ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        } ${interactive ? 'hover:text-yellow-300 cursor-pointer' : ''}`}
        disabled={!interactive}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Avaliar Instituição</h2>
        <p className="text-gray-600">{institutionName}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avaliação */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sua avaliação geral *
          </label>
          <div className="flex items-center gap-2">
            {renderStars(formData.rating, true)}
            <span className="text-sm text-gray-600 ml-2">
              {formData.rating > 0 ? `${formData.rating}/5` : 'Selecione uma avaliação'}
            </span>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Curso */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Curso (opcional)
          </label>
          <input
            type="text"
            placeholder="Ex: Medicina, Direito, Engenharia..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.course}
            onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
          />
        </div>

        {/* Comentário */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seu comentário *
          </label>
          <textarea
            placeholder="Compartilhe sua experiência com esta instituição..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.comment}
            onChange={(e) => handleCommentChange(e.target.value)}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {formData.comment.length}/500 caracteres
          </p>
        </div>

        {/* Recomendação */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Você recomendaria esta instituição?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="helpful"
                value="true"
                checked={formData.helpful}
                onChange={() => setFormData(prev => ({ ...prev, helpful: true }))}
                className="mr-2"
              />
              <span>Sim, recomendo</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="helpful"
                value="false"
                checked={!formData.helpful}
                onChange={() => setFormData(prev => ({ ...prev, helpful: false }))}
                className="mr-2"
              />
              <span>Não recomendo</span>
            </label>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Enviar Avaliação
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
} 