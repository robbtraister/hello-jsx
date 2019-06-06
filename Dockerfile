FROM alpine:3.9 as node

RUN apk update && \
    apk upgrade && \
    apk add --no-cache --update \
            nodejs \
            && \
    node -v && \
    rm -rf /var/cache/apk/*

WORKDIR /opt/project


FROM node as npm

RUN apk update && \
    apk upgrade && \
    apk add --no-cache --update \
            npm \
            && \
    npm i -g npm && \
    npm -v && \
    rm -rf /var/cache/apk/*

COPY package*.json ./


FROM npm as install

RUN npm ci --production


FROM npm as build

RUN npm ci

COPY . ./
RUN npm run build
# RUN npm run test


FROM node

COPY . ./
COPY --from=install /opt/project/node_modules ./node_modules
COPY --from=build /opt/project/dist ./dist

ENTRYPOINT ["node"]
CMD ["src/server"]
