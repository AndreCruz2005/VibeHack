import React from 'react';
import { Header } from '~/components/layout/Header';
import { InstitutionDetails } from '~/components/institution/InstitutionDetails';

export function meta() {
  return [
    { title: "VibeHack - Detalhes da Instituição" },
    { name: "description", content: "Detalhes completos da instituição de ensino superior." },
  ];
}

export default function InstitutionDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InstitutionDetails />
    </div>
  );
} 