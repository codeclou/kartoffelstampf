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
            imagemagick \
            optipng && \
    mkdir -p /opt/npm/ && \
    mkdir -p /opt/node/ && \
    mkdir -p /opt/npm/uploads && \
    mkdir -p /opt/npm/app && \
    addgroup -g 10777 nodeworker && \
    adduser -D -G nodeworker -u 10777 nodeworker && \
    chmod u+rx,g+rx,o+rx,a-w /opt/docker-entrypoint.sh && \
    chown -R nodeworker:nodeworker /opt/npm

#
# INSTALL APP
#
COPY server/ /opt/npm/app/
RUN cd /opt/npm/app/ && \
    npm install

#
# WORKDIR
#
USER nodeworker
VOLUME ["/opt/npm/"]
ENTRYPOINT ["/opt/docker-entrypoint.sh"]
WORKDIR /opt/npm/app/
CMD ["npm", "start"]