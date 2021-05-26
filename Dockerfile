# Builder image
FROM node:14-alpine AS builder

COPY package*.json ./app/

WORKDIR /app

RUN npm install

COPY . .

RUN npm run build

# Production image
FROM node:14-alpine

COPY package*.json ./usr/src/app/

WORKDIR /usr/src/app

RUN npm install --only=production

COPY --from=builder /app/dist/ ./dist/

COPY swagger.json ./

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]
