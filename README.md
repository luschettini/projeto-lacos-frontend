# 🐾 Laços de Pata - Frontend

Uma plataforma web moderna para conectar ONGs, protetores independentes e famílias interessadas em adoção responsável de animais.

## 📋 Sobre o Projeto

O **Laços de Pata** é uma aplicação web desenvolvida para facilitar o processo de adoção de animais, criando uma ponte entre quem precisa de um lar e quem tem amor para dar. A plataforma oferece uma experiência intuitiva e responsiva para visualizar animais disponíveis, conhecer suas histórias e entrar em contato com protetores.

### ✨ Funcionalidades Principais

- **🏠 Página Inicial**: Apresentação da plataforma com pets em destaque
- **🐕 Listagem de Animais**: Catálogo completo com sistema de filtros avançados
- **🔍 Detalhes do Animal**: Informações completas sobre cada pet
- **💬 Depoimentos**: Histórias reais de adoções bem-sucedidas
- **📞 Contato**: Formulário para comunicação com a equipe
- **ℹ️ Sobre Nós**: Informações sobre a missão e equipe

### 🎯 Características Técnicas

- ✅ Design responsivo (mobile-first)
- ✅ Interface intuitiva e acessível
- ✅ Integração completa com API backend
- ✅ Sistema de filtros dinâmicos
- ✅ Otimização de imagens
- ✅ Componentes reutilizáveis

## 🚀 Tecnologias Utilizadas

### Frontend
- **[Next.js 14](https://nextjs.org/)** - Framework React com App Router
- **[React 18](https://reactjs.org/)** - Biblioteca para interfaces
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Next/Image](https://nextjs.org/docs/api-reference/next/image)** - Otimização de imagens

### Ferramentas de Desenvolvimento
- **[ESLint](https://eslint.org/)** - Linting de código
- **[PostCSS](https://postcss.org/)** - Processamento CSS
- **JavaScript ES6+** - Linguagem de programação

## 📁 Estrutura do Projeto

```
projeto-lacos-frontend/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── globals.css         # Estilos globais
│   │   ├── layout.jsx          # Layout principal
│   │   ├── page.jsx            # Página inicial
│   │   ├── contato/
│   │   │   └── page.jsx        # Página de contato
│   │   ├── depoimentos/
│   │   │   └── page.jsx        # Página de depoimentos
│   │   ├── detalhes/
│   │   │   └── [id]/
│   │   │       └── page.jsx    # Detalhes do animal
│   │   ├── listagem/
│   │   │   └── page.jsx        # Lista de animais
│   │   └── sobre-mim/
│   │       └── page.jsx        # Sobre nós
│   └── components/             # Componentes reutilizáveis
│       ├── Header.jsx          # Cabeçalho
│       ├── Footer.jsx          # Rodapé
│       ├── PetCard.jsx         # Card do animal
│       └── TestimonialCard.jsx # Card de depoimento
├── public/                     # Arquivos estáticos
│   └── luiza-photo.jpg        # Foto da desenvolvedora
├── .next/                     # Build do Next.js
├── node_modules/              # Dependências
├── .gitignore                 # Arquivos ignorados pelo Git
├── eslint.config.mjs          # Configuração ESLint
├── jsconfig.json              # Configuração JavaScript
├── next.config.mjs            # Configuração Next.js
├── package.json               # Dependências e scripts
├── postcss.config.mjs         # Configuração PostCSS
├── tailwind.config.mjs        # Configuração Tailwind
└── README.md                  # Este arquivo
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18.0 ou superior
- npm, yarn, pnpm ou bun
- API Backend rodando na porta 3002

### 1. Clone o repositório
```bash
git clone [URL_DO_REPOSITORIO]
cd projeto-lacos-frontend
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure o ambiente
Certifique-se de que sua API backend está rodando em `http://localhost:3002`

### 4. Execute o projeto
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

### 5. Acesse a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🔌 Integração com API

A aplicação consome os seguintes endpoints da API backend:

### Animais
```http
GET /api/animals              # Lista todos os animais
GET /api/animals/featured     # Animais em destaque
GET /api/animals/:id          # Detalhes de um animal específico
```

### Usuários
```http
GET /api/users                # Lista usuários (para depoimentos)
```

### Depoimentos
```http
GET /api/testimonials         # Lista depoimentos
```

### Exemplo de Estrutura de Dados

**Animal da API:**
```json
{
  "id": 1,
  "name": "Rex",
  "species": "cachorro",
  "size": "medio",
  "gender": "macho",
  "age_category": "adulto",
  "description": "Cão muito carinhoso...",
  "photo_url": "/uploads/rex.jpg",
  "is_vaccinated": true,
  "is_neutered": true,
  "is_available": true,
  "owner_name": "Maria Silva",
  "owner_phone": "(11) 99999-9999",
  "owner_city": "São Paulo"
}
```

**Como é exibido no Frontend:**
```javascript
{
  id: 1,
  nome: "Rex",
  especie: "Cão",
  porte: "Médio",
  sexo: "Macho",
  idade: "Adulto",
  descricao: "Cão muito carinhoso...",
  fotos: ["/uploads/rex.jpg"],
  vacinado: true,
  castrado: true,
  disponivel: true,
  protetor: {
    nome: "Maria Silva",
    telefone: "(11) 99999-9999",
    cidade: "São Paulo"
  }
}
```

## 📱 Funcionalidades Detalhadas

### Página Inicial
- Banner principal com call-to-action
- Seção "Nossa Missão"
- Pets em destaque (busca via API)
- Cards responsivos dos animais

### Listagem de Animais
- **Filtros Dinâmicos:**
  - Espécie (Cão/Gato)
  - Porte (Pequeno/Médio/Grande)
  - Sexo (Macho/Fêmea)
  - Localização (busca por cidade)
- Grid responsivo de cards
- Indicadores de status (vacinado, castrado)
- Integração completa com API

### Detalhes do Animal
- Galeria de fotos
- Informações completas do pet
- Status de saúde
- Dados do protetor
- Botão de contato via WhatsApp
- Compartilhamento nativo

### Depoimentos
- Exibição de histórias reais
- Sistema de fallback com dados gerados
- Cards com informações do adotante e animal
- Integração com dados reais da API

## 🎨 Design System

### Cores Principais
```css
primary: {
  500: '#fb8c3c',  /* Laranja principal */
  600: '#f97316'   /* Laranja hover */
}

secondary: {
  500: '#a855f7'   /* Lilás */
}

accent: {
  500: '#f97142'   /* Laranja suave */
}
```

### Componentes
- **PetCard**: Card reutilizável para exibir animais
- **TestimonialCard**: Card para histórias de adoção
- **Header**: Navegação responsiva
- **Footer**: Informações de contato

## 🚀 Build e Deploy

### Build de Produção
```bash
npm run build
npm start
```

### Deploy Recomendado
- **[Vercel](https://vercel.com)** - Plataforma oficial do Next.js
- **[Netlify](https://netlify.com)** - Alternative popular
- **[Railway](https://railway.app)** - Para projetos full-stack

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Equipe

**Luiza Nicoluci Schettini**
- Desenvolvedora Full Stack
- Apaixonada por tecnologia e animais
- [GitHub](https://github.com/[seu-usuario])

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🐾 Missão

Nosso objetivo é transformar vidas através da tecnologia, facilitando adoções responsáveis e conectando corações. Cada linha de código é escrita pensando no bem-estar animal e na felicidade das famílias.

---

**Feito com ❤️ para os animais que precisam de um lar**
