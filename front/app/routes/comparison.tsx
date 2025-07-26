import React from 'react';
import { Header } from '~/components/layout/Header';
import { InstitutionComparison } from '~/components/comparison/InstitutionComparison';

export function meta() {
  return [
    { title: "VibeHack - Comparar Instituições" },
    { name: "description", content: "Compare instituições de ensino superior lado a lado." },
  ];
}

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InstitutionComparison />
    </div>
  );
} 