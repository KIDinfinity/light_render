FROM node:20.18.0

WORKDIR /fwd/ui/
ENV TZ=Asia/Shanghai

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g npm@8.5.5

RUN npm config set proxy null
RUN npm cache clean --f
RUN npm config set registry=https://registry.npmmirror.com
RUN npm ci --legacy-peer-deps

COPY ./ ./

CMD ["npm", "run", "build"]


