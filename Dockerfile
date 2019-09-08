# Stage 1 - the build process
FROM node:10.16-alpine
WORKDIR /usr/src/app
COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

COPY ts*.json ./
COPY src ./src
RUN npm run build

RUN rm -r src && rm ts*.json

# Stage 2 - the production environment
#FROM node:10.16-alpine
#WORKDIR /usr/src/app
#COPY --from=build-deps /usr/src/app/dist ./dist
#COPY --from=build-deps /usr/src/app/node_modules ./node_modules
#COPY --from=build-deps /usr/src/app/node_modules ./app
EXPOSE 1414
CMD ["node", "."]