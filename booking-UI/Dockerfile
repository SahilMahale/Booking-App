FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:1.25.4-alpine as prod
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf.template /etc/nginx/conf.d/
EXPOSE 8080

