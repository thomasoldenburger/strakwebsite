FROM node:latest
WORKDIR /app/
COPY package.json server.js /app/
RUN npm install
COPY build /app/build
