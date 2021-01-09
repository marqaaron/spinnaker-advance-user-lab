FROM alpine:3.12
ARG VERSION='dev'
RUN apk add --no-cache bash
RUN apk add --no-cache python3 py3-pip
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN ["chmod", "+x", "/app/dev/devStartupPython.sh"]
ENTRYPOINT ["/bin/bash","-c","/app/dev/devStartupPython.sh"]
EXPOSE 8082