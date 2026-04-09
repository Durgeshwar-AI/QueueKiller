FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM alpine:latest

WORKDIR /app
COPY --from=builder /app/dist /app/dist_static
CMD ["sh", "-c", "echo 'Refreshing frontend assets...' && cp -rv /app/dist_static/* /app/dist/ && echo 'Done' && sleep infinity"]
