FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

# RUN npx prisma migrate dev --name init

COPY . .

EXPOSE 4000

CMD ["npm","run", "server"]