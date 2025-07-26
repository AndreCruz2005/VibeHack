import React, { useState } from 'react';
import { Header } from '~/components/layout/Header';
import { InstitutionComparison } from '~/components/comparison/InstitutionComparison';

export function meta() {
  return [
    { title: "VibeHack - Comparar Instituições" },
    { name: "description", content: "Compare instituições de ensino superior lado a lado." },
  ];
}

export default function ComparisonPage() {
  // TODO: Implementar estado global para gerenciar instituições selecionadas para comparação
  const [selectedInstitutions] = useState<string[]>(['1', '2', '3']);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InstitutionComparison institutionIds={selectedInstitutions} />
    </div>
  );
} 