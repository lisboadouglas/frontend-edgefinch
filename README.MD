# Edge Finch Teste - Frontend

Aplicação React para consulta de ofertas de crédito integrada com a API Gosat

![Preview](/public/preview.png) <!-- Adicione uma imagem de preview se disponível -->

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm 9+
- API Backend em execução (ver repositório da API)

### 🔧 Configuração

1. **Clonar repositório**
```bash
git clone https://github.com/seu-usuario/edge-finc-frontend.git
cd edge-finc-frontend
```

2. Instalar dependências
```bash
npm install
```

3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com:
```bash
VITE_API_BASE_URL=a_url_aqui
VITE_API_TOKEN=seu_token_jwt_aqui
```

[!NOTE]
> Obter o token:
>
>Acesse o projeto da API
>
>Localize o API_STATIC_TOKEN no .env do backend
>
>Use o mesmo valor para VITE_API_TOKEN

### 🖥 Executar aplicação
```bash
npm run dev
```

Acesse: http://localhost:5173

### 📦 Build de produção
```env
npm run build
```

Irá gerar os assets na `dist/`

### ⚙️ Estrutura Técnica

Stack Principal

- : **Framework**: React 18 + Vite
- : **Estilização**: Tailwind CSS 3
- : **HTTP Client**: Axios


Desenvolvido por Douglas S Lisboa
Documentação da API: 