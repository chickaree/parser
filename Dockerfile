FROM node:lts-alpine

ARG GITHUB_TOKEN

COPY . /app

WORKDIR /app

RUN  echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" > ~/.npmrc; \
  npm install --production --verbose; \
  rm  ~/.npmrc;

ENV PORT=8080

CMD npm start;
