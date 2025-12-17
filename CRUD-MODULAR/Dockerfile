FROM node:20

WORKDIR /app

# Copia package.json e package-lock.json primeiro para aproveitar cache
COPY package*.json ./

RUN npm install

# Copia todo o restante do código
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
