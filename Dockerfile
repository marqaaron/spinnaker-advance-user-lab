FROM alpine:3.12 AS baseimage
ARG VERSION='dev'
ARG APP_SERVER='nginx'
RUN apk add --no-cache bash
COPY .build /build
RUN ["chmod", "+x", "/build/baseimage.sh"]
RUN ["/bin/bash","-c","/build/baseimage.sh"]

FROM baseimage AS saulintermediate
WORKDIR /system
COPY /app ./app
COPY /servers ./servers
RUN ["/bin/bash","-c","/build/saulintermediate.sh"]

FROM baseimage
MAINTAINER MarqAAron
COPY --from=saulintermediate /system /system
ENTRYPOINT ["/bin/bash","-c","/system/servers/startup.sh"]
EXPOSE 8082