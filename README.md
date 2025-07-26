# 🎓 VibeHack - Sistema de Escolha de Instituições de Ensino Superior

Um sistema web moderno que auxilia estudantes na escolha de instituições de ensino superior, considerando fatores como orçamento, avaliação do MEC, avaliação de estudantes, infraestrutura e localização.

## ⚡ Quick Start

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>
cd VibeHack

# Instale as dependências
npm run install:all

# Execute o projeto
npm run dev
```

Acesse: **http://localhost:5173**

## 🚀 Funcionalidades

### Principais
- **Busca Avançada**: Filtros por preço, avaliações, localização e infraestrutura
- **Comparação**: Compare até 4 instituições lado a lado
- **Favoritos**: Salve suas instituições preferidas
- **Detalhes Completos**: Informações detalhadas sobre cada instituição
- **Avaliações**: Sistema de avaliação e comentários dos estudantes

### Filtros Disponíveis
- **Orçamento**: Faixa de preço (mensalidade)
- **Avaliação MEC**: Nota mínima de 1 a 5
- **Avaliação Estudantes**: Nota mínima de 1 a 5
- **Infraestrutura**: Biblioteca, laboratórios, Wi-Fi, estacionamento, etc.
- **Localização**: Estado e cidade
- **Tipo de Curso**: Bacharelado, Licenciatura, Tecnólogo, Pós-graduação

## 🛠️ Tecnologias

### Frontend
- **React 19** + TypeScript
- **React Router v7** - Roteamento
- **Tailwind CSS** - Estilização
- **Vite** - Build tool
- **Context API** - Gerenciamento de estado

### Backend (Futuro)
- **Node.js** + Express
- **Banco de dados** (a definir)

## 📁 Estrutura do Projeto

```
VibeHack/
├── front/                          # Frontend React
│   ├── app/
│   │   ├── components/             # Componentes React
│   │   │   ├── search/            # Filtros de busca
│   │   │   ├── institution/       # Cards e detalhes de instituições
│   │   │   ├── comparison/        # Comparação de instituições
│   │   │   ├── favorites/         # Lista de favoritos
│   │   │   ├── review/           # Formulário de avaliação
│   │   │   └── layout/           # Header e layout
│   │   ├── contexts/             # Contextos React (Favoritos, Comparação)
│   │   ├── routes/               # Páginas da aplicação
│   │   ├── services/             # Serviços de API
│   │   ├── types/                # Tipos TypeScript
│   │   └── root.tsx              # Configuração principal
│   ├── public/                   # Arquivos estáticos
│   ├── package.json              # Dependências do frontend
│   └── README.md                 # Documentação do frontend
├── back/                         # Backend (futuro)
│   ├── server.js                 # Servidor Express básico
│   └── package.json              # Dependências do backend
└── README.md                     # Este arquivo
```

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** ou **yarn** (vem com Node.js)
- **Git** ([Download](https://git-scm.com/))

### 1. Clone o Repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd VibeHack
```

### 2. Instale Todas as Dependências
```bash
# Opção 1: Instalar tudo de uma vez (recomendado)
npm run install:all

# Opção 2: Instalar manualmente
cd front && npm install
cd ../back && npm install
```

### 3. Execute o Projeto
```bash
# Opção 1: Executar frontend e backend juntos
npm run dev

# Opção 2: Executar apenas o frontend
npm run dev:front

# Opção 3: Executar apenas o backend
npm run dev:back
```

**URLs de acesso:**
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

## 📊 Dados de Exemplo

O sistema inclui dados mockados de 22 instituições de ensino superior, incluindo:

### Universidades Públicas
- Universidade Federal de São Paulo (UNIFESP)
- Universidade de São Paulo (USP)
- Universidade Federal do Rio de Janeiro (UFRJ)
- Universidade Estadual de Campinas (UNICAMP)
- Universidade Federal de Minas Gerais (UFMG)

### Universidades Privadas
- Pontifícia Universidade Católica de São Paulo (PUC-SP)
- Universidade Presbiteriana Mackenzie
- Universidade Anhembi Morumbi
- Universidade Paulista (UNIP)

### Cursos Disponíveis
- Medicina, Engenharia, Direito, Administração
- Ciência da Computação, Psicologia, Fisioterapia
- Tecnólogos em TI, Design, Marketing
- E muito mais...

## 🎨 Interface

- **Design responsivo** - Funciona em desktop, tablet e mobile
- **Componentes reutilizáveis** - Código limpo e organizado
- **Estados de loading** - Feedback visual durante carregamentos
- **Navegação intuitiva** - Fácil de usar
- **Comparação visual** - Tabelas claras para comparação

## 🔧 Configuração de Desenvolvimento

### Scripts Disponíveis

#### Scripts da Raiz (Recomendados)
```bash
npm run dev          # Executa frontend e backend juntos
npm run dev:front    # Executa apenas o frontend
npm run dev:back     # Executa apenas o backend
npm run install:all  # Instala todas as dependências
npm run build        # Build do frontend para produção
npm run preview      # Preview do build
npm run lint         # Verificar código
```

#### Scripts do Frontend
```bash
cd front
npm run dev          # Desenvolvimento com hot reload
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Verificar código
```

#### Scripts do Backend
```bash
cd back
npm start           # Inicia o servidor
npm run dev         # Desenvolvimento com nodemon (se configurado)
```

### Estrutura de Componentes
- **InstitutionCard**: Card de instituição com ações
- **InstitutionDetails**: Página detalhada da instituição
- **InstitutionComparison**: Comparação lado a lado
- **SearchFilters**: Filtros avançados de busca
- **FavoritesList**: Lista de favoritos

### Contextos
- **FavoritesContext**: Gerencia favoritos globalmente
- **ComparisonContext**: Gerencia comparações globalmente

## 🔮 Próximos Passos

### Backend
- [ ] Implementar API REST real
- [ ] Sistema de autenticação
- [ ] Banco de dados
- [ ] Upload de imagens

### Frontend
- [ ] Sistema de avaliações real
- [ ] Filtros avançados
- [ ] Mapa de localização
- [ ] Notificações
- [ ] PWA (Progressive Web App)

### Funcionalidades
- [ ] Chat de suporte
- [ ] Sistema de recomendações
- [ ] Exportar comparações
- [ ] Compartilhar instituições

## 🐛 Solução de Problemas

### Erro de Porta em Uso
```bash
# Se a porta 5173 estiver ocupada
npm run dev -- --port 3001
```

### Erro de Dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de TypeScript
```bash
# Verificar tipos
npm run type-check
```

## 📝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para o **VibeHack**.

## 👥 Equipe

- Desenvolvido durante hackathon
- Foco em experiência do usuário
- Tecnologias modernas
- Código limpo e documentado

---

**🎓 VibeHack** - Encontre sua instituição ideal! 