import React from 'react'
import { GraduationCap, BookOpen } from 'lucide-react'

interface HeaderProps {
  userLocation?: [number, number] | null
}

const Header: React.FC<HeaderProps> = ({ userLocation }) => {
  return (
    <header className="glass-dark p-2 shadow-xl animate-fade-in border-t-2 border-[color:var(--primary-color)]">
      <div className="flex items-end justify-start w-full px-4">
        {/* Logo e título */}
        <div className="flex items-center space-x-3 animate-slide-in">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-[color:var(--primary-color)] rounded-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="p-2 bg-[color:var(--accent-color)] rounded-lg">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[color:var(--primary-color)] to-[color:var(--accent-color)] bg-clip-text text-transparent">
              ESTIMA EDUCAÇÃO
            </h1>
            <p className="text-sm text-[color:var(--main-text)]/80 font-medium">
              Conectando futuros estudantes à educação de qualidade
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 