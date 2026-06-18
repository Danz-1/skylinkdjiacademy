# Usa a imagem oficial do Node.js baseada no Alpine Linux (mais leve)
FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de configuração (package.json) para o contêiner
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código do projeto para o diretório de trabalho do contêiner
COPY . .

# Expõe a porta que o app vai rodar (mesma porta do .env ou padrão 3000)
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
