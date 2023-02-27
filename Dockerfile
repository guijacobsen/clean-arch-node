FROM node:18.x
WORKDIR /usr/app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --only=prod

COPY ./dist ./dist

EXPOSE 5000
CMD npm start