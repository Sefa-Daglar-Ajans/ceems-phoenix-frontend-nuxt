FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -g npm
RUN npm ci

COPY . .
RUN npm run build

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=build /app/.output .output

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NUXT_PUBLIC_API_BASE=https://api.ceemsphoenix.com

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
