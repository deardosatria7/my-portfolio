FROM node:20-alpine

WORKDIR /app

# copy package.json dulu biar cache kepake
COPY package*.json ./
RUN npm install

# copy semua source
COPY . .

# build app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]