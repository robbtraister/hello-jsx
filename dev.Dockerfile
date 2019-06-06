FROM alpine:3.9

RUN apk update && \
    apk upgrade && \
    apk add --no-cache --update \
            nodejs-npm \
            && \
    npm i -g npm && \
    node -v && \
    npm -v

WORKDIR /opt/project

COPY package*.json ./

RUN npm install

COPY . ./

ENTRYPOINT ["npm", "run"]
CMD ["dev"]
