FROM alpine:3.12
MAINTAINER MarqAAron
ARG VERSION='dev'
RUN apk add --update nodejs npm nginx bash
RUN apk add --no-cache git
RUN git --version
RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
COPY /scripts /scripts
RUN cd /scripts && echo ${VERSION} > version && chmod +rw version
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ["chmod", "+x", "scripts/startup.sh"]
ENTRYPOINT ["/bin/bash","-c","scripts/startup.sh"]
EXPOSE 8082