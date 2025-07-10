FROM node:20 as builder

WORKDIR /app
COPY meu_backend/package*.json ./
RUN npm install --omit=dev
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000

CMD ["node", "meu_backend/server.js"]