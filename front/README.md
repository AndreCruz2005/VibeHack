# VibeHack - Sistema de Escolha de Instituições de Ensino Superior

Um sistema web moderno que auxilia estudantes na escolha de instituições de ensino superior, considerando fatores como orçamento, avaliação do MEC, avaliação de estudantes, infraestrutura e localização.

## 🚀 Funcionalidades

### Principais
- **Busca Avançada**: Filtros por preço, avaliações, localização e infraestrutura
- **Comparação**: Compare até 3 instituições lado a lado
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

- **Frontend**: React 19 + TypeScript
- **Roteamento**: React Router v7
- **Estilização**: Tailwind CSS
- **Build**: Vite
- **Backend**: Node.js + Express (futuro)

## 📁 Estrutura do Projeto

```
front/
├── app/
│   ├── components/
│   │   ├── search/
│   │   │   └── SearchFilters.tsx          # Filtros de busca
│   │   ├── institution/
│   │   │   ├── InstitutionCard.tsx        # Card da instituição
│   │   │   ├── InstitutionList.tsx        # Lista de instituições
│   │   │   └── InstitutionDetails.tsx     # Detalhes da instituição
│   │   ├── comparison/
│   │   │   └── InstitutionComparison.tsx  # Comparação de instituições
│   │   ├── favorites/
│   │   │   └── FavoritesList.tsx          # Lista de favoritos
│   │   ├── review/
│   │   │   └── ReviewForm.tsx             # Formulário de avaliação
│   │   └── layout/
│   │       └── Header.tsx                 # Header da aplicação
│   ├── routes/
│   │   ├── search.tsx                     # Página principal de busca
│   │   ├── favorites.tsx                  # Página de favoritos
│   │   ├── comparison.tsx                 # Página de comparação
│   │   └── institution.$id.tsx            # Página de detalhes
│   ├── services/
│   │   └── institutionService.ts          # Serviços de API (mockados)
│   ├── types/
│   │   └── institution.ts                 # Tipos TypeScript
│   └── routes.ts                          # Configuração de rotas
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
cd front
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 🔧 Configuração do Backend

O sistema está preparado para integração com um backend. As chamadas de API estão mockadas no arquivo `services/institutionService.ts`.

### Endpoints Futuros
- `GET /api/institutions/search` - Buscar instituições com filtros
- `GET /api/institutions/:id` - Buscar instituição por ID
- `GET /api/institutions/favorites` - Buscar favoritos
- `POST /api/institutions/:id/favorite` - Adicionar/remover favorito
- `POST /api/institutions/compare` - Buscar instituições para comparação
- `POST /api/reviews` - Enviar avaliação

## 📊 Dados Mockados

O sistema inclui dados de exemplo de 3 instituições:
1. **Universidade Federal de São Paulo** - Pública, Medicina
2. **Pontifícia Universidade Católica de São Paulo** - Privada, Direito
3. **Universidade de São Paulo** - Pública, Engenharia Civil

## 🎨 Interface

- Design responsivo e moderno
- Componentes reutilizáveis
- Estados de loading e erro
- Navegação intuitiva
- Comparação visual clara

## 🔮 Próximos Passos

- [ ] Implementar backend real
- [ ] Sistema de autenticação
- [ ] Persistência de favoritos
- [ ] Sistema de avaliações real
- [ ] Filtros avançados
- [ ] Mapa de localização
- [ ] Notificações
- [ ] PWA (Progressive Web App)

## 📝 Licença

Este projeto foi desenvolvido para o VibeHack.
