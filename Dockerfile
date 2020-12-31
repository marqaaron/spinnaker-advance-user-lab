FROM alpine:3.12 AS baseImage
ARG VERSION='dev'
RUN apk add --update nodejs npm nginx bash
RUN apk add --no-cache git
WORKDIR /version
RUN echo ${VERSION} > version && chmod +rw version

FROM baseImage AS saulApp
WORKDIR /app
COPY /build ./build
COPY --from=baseImage /version ./build/scripts
COPY package*.json ./
RUN npm install
COPY . .
RUN ["chmod", "+x", "./build/scripts/startup.sh"]

FROM baseImage
MAINTAINER MarqAAron
WORKDIR /app
COPY --from=saulApp /app .
ENTRYPOINT ["/bin/bash","-c","./build/scripts/startup.sh"]
EXPOSE 8082