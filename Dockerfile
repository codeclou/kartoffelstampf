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
    mkdir -p /opt/npm/app && \
    addgroup -g 10777 nodeworker && \
    adduser -D -G nodeworker -u 10777 nodeworker && \
    chmod u+rx,g+rx,o+rx,a-w /opt/docker-entrypoint.sh && \
    chown -R nodeworker:nodeworker /opt/npm && \
    chown -R nodeworker:nodeworker /u



#
# MAKE optipng 0.7.6 with my "awesome-STDOUT-patch",
# so that only errors are logged to STDERR
# and normal output is logged to STDOUT
#
COPY optipng-stdout-0.7.6.patch /opt/
RUN apk add --no-cache --virtual .build-deps \
            libstdc++ \
            binutils-gold \
            curl \
            g++ \
            gcc \
            gnupg \
            libgcc \
            linux-headers \
            make \
            git
RUN mkdir -p /opt/optipng-build/ && \
    wget -O /opt/optipng-0.7.6.zip https://codeclou.github.io/kartoffelstampf/repo/optipng-0.7.6.zip && \
    unzip /opt/optipng-0.7.6.zip -d /opt/optipng-build/ && \
    ls -la /opt/optipng-build/ && \
    find * /opt/optipng-build/ && \
    cp /opt/optipng-stdout-0.7.6.patch /opt/optipng-build/optipng-0.7.6/src/optipng && \
    cd /opt/optipng-build/optipng-0.7.6/src/optipng && \
    git apply optipng-stdout-0.7.6.patch && \
    cd /opt/optipng-build/optipng-0.7.6  && \
    ./configure  && \
    make  && \
    make install  && \
    rm -rf /opt/optipng-build/

#apk del .build-deps && \

#
# INSTALL APP
#
COPY ./ /opt/npm/app/
RUN cd /opt/npm/app/ && \
    npm install

#
# WORKDIR
#
USER nodeworker
EXPOSE 9999
VOLUME ["/opt/npm/app/"]
VOLUME ["/u"]
ENTRYPOINT ["/opt/docker-entrypoint.sh"]
WORKDIR /opt/npm/app/
CMD ["npm", "start"]