# Stage 1 - the build process
FROM node:10.16-alpine as builder
WORKDIR /usr/src/app
COPY . .

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

RUN npm run build

# Stage 2 - the production environment
FROM node:10.16-alpine
WORKDIR /usr/src/app
COPY package*.json ./

RUN apk add --no-cache --virtual .gyp python make g++\
  && npm install --production \
  && apk del .gyp python make g++

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 1414
CMD ["node", "dist/main.js"]