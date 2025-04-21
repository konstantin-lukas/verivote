FROM node:23-alpine

WORKDIR /home/node/verivote

RUN apk add --no-cache libc6-compat

COPY src src
COPY public public
COPY package.json .
COPY package-lock.json .
COPY .env .
COPY .env.local .
COPY next.config.ts .
COPY postcss.config.mjs .
COPY tsconfig.json .

RUN npm ci

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

RUN mkdir -p /home/node/verivote/.next/cache/fetch-cache && chown -R node:node /home/node/verivote/.next/cache

USER node

CMD ["npm", "run", "start"]
