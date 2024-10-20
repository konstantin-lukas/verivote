FROM node:23-alpine

WORKDIR /verivote

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

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
