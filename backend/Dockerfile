FROM node:20.10.0-alpine

WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
