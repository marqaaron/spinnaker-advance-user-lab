FROM alpine:3.12 AS baseimage
ARG VERSION='dev'
ARG APP_SERVER='nginx'
RUN apk add --no-cache bash
COPY /.build /build
COPY /servers /servers
RUN ["chmod", "+x", "/build/baseimage.sh"]
RUN ["/bin/bash","-c","/build/baseimage.sh"]

FROM baseimage AS saulintermediate
WORKDIR /ui
COPY /app ./app
RUN ["/bin/bash","-c","/build/saulintermediate.sh"]

FROM baseimage
MAINTAINER MarqAAron
COPY --from=saulintermediate /ui /ui
ENTRYPOINT ["/bin/bash","-c","/servers/startup.sh"]
EXPOSE 8082