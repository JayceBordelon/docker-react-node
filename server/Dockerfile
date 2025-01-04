FROM node:18

WORKDIR /app

COPY package*.json ./

RUN rm -rf ./node_modules && rm ./package-lock.json && npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
