# Exposed port must be the same as the port defined in your code

FROM node:18.20.5

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173 

CMD ["npm", "run", "docker"]