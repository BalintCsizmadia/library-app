FROM node:24.14.0-alpine

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
