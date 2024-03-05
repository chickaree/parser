ARG BASE="node:lts-alpine"

FROM --platform=$BUILDPLATFORM ${BASE} AS builder

ARG GITHUB_TOKEN

COPY . /app

WORKDIR /app

RUN  echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" > ~/.npmrc; \
  npm install --production --verbose; \
  rm  ~/.npmrc;

FROM ${BASE} AS server

COPY --from=builder /app /app

WORKDIR /app

ENV PORT=8080

CMD npm start;
