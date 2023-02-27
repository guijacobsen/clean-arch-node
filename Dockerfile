FROM node:14.17.1
WORKDIR /usr/app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --only=prod