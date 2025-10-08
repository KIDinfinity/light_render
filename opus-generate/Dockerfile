FROM node:20.18.0

USER root

ENV NODE_ENV=production

WORKDIR /usr/src/app/

COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y \
    chromium

RUN apt-get update && apt-get install -y \
    fontconfig fonts-noto fonts-thai-tlwg

COPY . .
COPY ./font/* /usr/share/fonts/
COPY app/public/fonts /usr/src/app/app/public/fonts


RUN rm -rf ~/.cache/fontconfig/*
RUN fc-cache -fv
RUN ls -l /usr/share/fonts
RUN fc-list | grep "tahoma"

EXPOSE 7001

CMD ["npm", "start"]