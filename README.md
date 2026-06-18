# MVP Checkout Curso de Drones DJI - Integração Mercado Pago

Este projeto é um Produto Mínimo Viável (MVP) contendo uma Landing Page (`index.html`), uma página de Checkout (`checkout.html`) e um Servidor Backend Node.js (`server.js`) integrado ao Mercado Pago (Checkout Pro / API de Preferências).

## Configuração Inicial Obrigatória (Credenciais do Mercado Pago)

Antes de rodar o projeto, você precisa configurar seu **Access Token** do Mercado Pago:

1. Na pasta do projeto, encontre o arquivo **`.env.example`**.
2. Renomeie ele para **apenas `.env`** (sem o `.example`).
3. Abra o arquivo `.env` e cole o seu **Access Token** do Mercado Pago no lugar correspondente:

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

- Clique em **"GARANTIR MINHA VAGA AGORA"** para ir ao Checkout.
- Preencha os dados de teste.
- Clique em **"IR PARA PAGAMENTO"**.
- O sistema vai chamar o backend, criar a preferência e redirecionar para a tela do Mercado Pago.

## Estrutura de Arquivos

- `index.html`: Landing Page.
- `checkout.html`: Formulário e resumo de pagamento.
- `server.js`: API Backend em Express integrado ao Mercado Pago.
- `Dockerfile` e `docker-compose.yml`: Arquivos de configuração do Docker.
- `.env`: Arquivo (que você criará a partir do `.env.example`) com suas chaves de segurança.
