FROM node:23-alpine

WORKDIR /home/node/verivote

RUN apk add --no-cache libc6-compat

COPY app app
COPY components components
COPY data data
COPY public public
COPY package.json .
COPY package-lock.json .
COPY .env.local .
COPY hooks.ts .
COPY middleware.ts .
COPY next.config.mjs .
COPY postcss.config.mjs .
COPY tailwind.config.ts .
COPY tsconfig.json .
COPY utils.tsx .

RUN npm ci

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

RUN mkdir -p /home/node/verivote/.next/cache/fetch-cache && chown -R node:node /home/node/verivote/.next/cache

USER node

CMD ["npm", "run", "start"]
