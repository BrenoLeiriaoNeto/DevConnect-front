FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package*.json  pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

ARG VITE_API_URL
ARG VITE_ENVIRONMENT
ARG VITE_APP_NAME
ENV VITE_API_URL=$VITE_API_URL \
    VITE_ENVIRONMENT=$VITE_ENVIRONMENT \
    VITE_APP_NAME=$VITE_APP_NAME

RUN pnpm run build

FROM nginx:stable-alpine

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
