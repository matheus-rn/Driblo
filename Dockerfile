FROM node:10

WORKDIR /usr/app

COPY . .

RUN yarn

EXPOSE 8001