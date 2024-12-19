FROM node:latest

WORKDIR /application

COPY . .

RUN npm install

RUN npm install -g pm2

RUN npm run typescript

CMD ["pm2-runtime", "start", "./dist/index.js"]
