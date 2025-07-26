import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Institution } from '~/types/institution';
import { institutionService } from '~/services/institutionService';

interface ComparisonContextType {
  comparison: string[];
  addToComparison: (institutionId: string) => void;
  removeFromComparison: (institutionId: string) => void;
  clearComparison: () => void;
  isInComparison: (institutionId: string) => boolean;
  getComparisonInstitutions: () => Promise<Institution[]>;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparison, setComparison] = useState<string[]>([]);

  const addToComparison = (institutionId: string) => {
    setComparison(prev => {
      if (prev.includes(institutionId)) {
        return prev;
      }
      if (prev.length >= 4) {
        alert('Você pode comparar no máximo 4 instituições por vez.');
        return prev;
      }
      return [...prev, institutionId];
    });
  };

  const removeFromComparison = (institutionId: string) => {
    setComparison(prev => prev.filter(id => id !== institutionId));
  };

  const clearComparison = () => {
    setComparison([]);
  };

  const isInComparison = (institutionId: string) => {
    return comparison.includes(institutionId);
  };

  const getComparisonInstitutions = async (): Promise<Institution[]> => {
    const allInstitutions = institutionService.getMockInstitutions();
    return allInstitutions.filter(inst => comparison.includes(inst.id));
  };

  // Carregar comparação salva no localStorage ao inicializar
  useEffect(() => {
    const savedComparison = localStorage.getItem('comparisonInstitutions');
    if (savedComparison) {
      try {
        const savedIds = JSON.parse(savedComparison);
        setComparison(savedIds);
        // Limpar o localStorage após carregar
        localStorage.removeItem('comparisonInstitutions');
      } catch (error) {
        console.error('Erro ao carregar comparação salva:', error);
      }
    }
  }, []);

  return (
    <ComparisonContext.Provider value={{ 
      comparison, 
      addToComparison, 
      removeFromComparison, 
      clearComparison, 
      isInComparison,
      getComparisonInstitutions
    }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison deve ser usado dentro de um ComparisonProvider');
  }
  return context;
} 