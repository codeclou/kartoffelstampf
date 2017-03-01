FROM alpine:3.5

COPY docker-entrypoint.sh /opt/docker-entrypoint.sh

RUN echo "@testing http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories

RUN echo  >> /etc/apk/repositories && \
    apk add --no-cache \
            nodejs \
            bash \
            wget \
            gzip \
            exiftool \
            fbida-exiftran \
            jpegoptim@testing \
            pngquant@testing \
            imagemagick \
            optipng && \
    mkdir -p /u/ && \
    mkdir -p /opt/npm/ && \
    mkdir -p /opt/node/ && \
    mkdir -p /opt/npm/uploads && \
    mkdir -p /opt/npm/server && \
    mkdir -p /opt/npm/client && \
    addgroup -g 10777 nodeworker && \
    adduser -D -G nodeworker -u 10777 nodeworker && \
    chmod u+rx,g+rx,o+rx,a-w /opt/docker-entrypoint.sh && \
    chown -R nodeworker:nodeworker /opt/npm && \
    chown -R nodeworker:nodeworker /u

#
# INSTALL APP
#
COPY server/ /opt/npm/server/
RUN cd /opt/npm/server/ && \
    npm install

#
# WORKDIR
#
USER nodeworker
EXPOSE 9999
VOLUME ["/opt/npm/server/"]
VOLUME ["/opt/npm/client/"]
VOLUME ["/u"]
ENTRYPOINT ["/opt/docker-entrypoint.sh"]
WORKDIR /opt/npm/server/
CMD ["npm", "start"]