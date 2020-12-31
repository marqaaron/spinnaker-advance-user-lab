FROM alpine:3.12 AS baseimage
ARG VERSION='dev'
RUN apk add --update nodejs npm nginx bash && apk add --no-cache git
WORKDIR /version
RUN echo ${VERSION} > version && chmod +rw version

FROM baseimage AS saulintermediate
WORKDIR /app
COPY /build ./build
COPY --from=baseimage /version ./build/scripts
COPY package*.json ./
RUN npm install
COPY . .
RUN ["chmod", "+x", "./build/scripts/startup.sh"]

FROM saulintermediate
MAINTAINER MarqAAron
WORKDIR /app
COPY --from=saulintermediate /app .
ENTRYPOINT ["/bin/bash","-c","./build/scripts/startup.sh"]
EXPOSE 8082