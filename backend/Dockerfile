FROM node:24.14.0-alpine

WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
