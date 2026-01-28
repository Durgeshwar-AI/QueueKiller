FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci --omit=dev

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 8000

CMD ["npm", "start"]