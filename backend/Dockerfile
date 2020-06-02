# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /backend

# add `/backend/node_modules/.bin` to $PATH
ENV PATH /backend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /backend
RUN npm install --silent

# start app
CMD ["npm", "start"]

# docker build -t="librarybackdev:0.5.29" .
