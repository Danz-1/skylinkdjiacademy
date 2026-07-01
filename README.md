# Produto Antigravidade - Plataforma de Vendas White-Label

Este projeto é uma plataforma de vendas (Landing Page e Checkout) construída como um Produto Mínimo Viável (MVP) White-Label. Para fins de demonstração, o produto configurado atualmente é **"1 grama de Antigravidade"**.

O projeto conta com um front-end hiper-moderno em estilo **Glassmorphism**, uma Landing Page (`index.html`), uma página de Checkout (`checkout.html`) com formulário translúcido, e um Servidor Backend Node.js (`server.js`) integrado ao Mercado Pago.

## Configuração Inicial Obrigatória (Credenciais do Mercado Pago)

Antes de rodar o projeto, você precisa configurar seu **Access Token** do Mercado Pago:

1. Na pasta do projeto, encontre o arquivo **`.env.example`** (ou crie um arquivo `.env` direto).
2. Abra o arquivo `.env` e cole o seu **Access Token** do Mercado Pago no lugar correspondente:

```env
MERCADOPAGO_ACCESS_TOKEN=APP_USR-seu-token-aqui
PORT=3000
```

> O Access Token pode ser encontrado no seu [Painel de Desenvolvedores do Mercado Pago](https://www.mercadopago.com.br/developers/panel/credentials) > Suas integrações > Credenciais de Teste (ou Produção).

---

## Como Executar (Recomendado: Usando Docker)

Como você já tem o Docker instalado, esta é a forma mais fácil e rápida de rodar o projeto sem instalar o Node.js.

1. Abra o terminal (PowerShell ou Prompt de Comando) na pasta do projeto.
2. Certifique-se de que o Docker Desktop está aberto rodando no seu Windows.
3. Execute o comando:
```bash
docker-compose up --build
```
4. O Docker vai baixar as dependências e iniciar o servidor automaticamente! Você verá a mensagem de que o servidor está rodando na porta 3000.

Para parar o servidor no Docker, basta apertar `Ctrl + C` no terminal.

---

## Como Executar (Alternativa: Usando Node.js nativo)

Caso prefira rodar sem o Docker no futuro:

1. Instale o **Node.js** baixando em [nodejs.org](https://nodejs.org/).
2. Abra o terminal na pasta do projeto e instale as dependências:
```bash
npm install
```
3. Inicie o servidor:
```bash
npm start
```

---

## Acessando o Sistema

Com o servidor rodando (seja via Docker ou Node.js nativo), abra seu navegador e acesse:
👉 **[http://localhost:3000/index.html](http://localhost:3000/index.html)**

- Você verá a Landing Page hiper-moderna (Glassmorphism) vendendo **1 grama de Antigravidade**.
- Clique no botão de CTA para ir ao Checkout.
- Preencha os dados de teste na interface translúcida.
- O sistema processará o pagamento (simulado via SDK/API do Mercado Pago).

## Estrutura de Arquivos

- `index.html`: Landing Page (Tema White-Label / Glassmorphism).
- `checkout.html`: Formulário e resumo de pagamento.
- `sucesso.html`: Tela de confirmação pós-compra.
- `server.js`: API Backend em Express integrado ao Mercado Pago.
- `Dockerfile` e `docker-compose.yml`: Arquivos de configuração do Docker.
- `.env`: Arquivo com suas chaves de segurança.
