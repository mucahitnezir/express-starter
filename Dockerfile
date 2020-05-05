# Builder image
FROM node:12.16.2-alpine AS builder

COPY package*.json ./app/

WORKDIR /app

RUN npm install

COPY . .

RUN npm run build

# Production image
FROM node:12.16.2-alpine

COPY package*.json ./usr/src/app/

WORKDIR /usr/src/app

RUN npm install --only=production

COPY --from=builder /app/dist/ ./dist/

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]
