FROM node:24-alpine

WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
