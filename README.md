[![](https://codeclou.github.io/kartoffelstampf/img/kartoffelstampf.svg)](https://github.com/codeclou/kartoffelstampf/)


&nbsp;

> Compress, Squash and Stampf your Images in a convenient way. Out-of-the-Box Docker Image with Web-GUI to perform lossless PNG and JPG compression.

[![](https://codeclou.github.io/doc/badges/generated/docker-image-size-150.svg)](https://hub.docker.com/r/codeclou/kartoffelstampf/tags/) [![](https://codeclou.github.io/doc/badges/generated/docker-from-alpine-3.8.svg)](https://alpinelinux.org/) [![](https://codeclou.github.io/doc/badges/generated/docker-run-as-non-root.svg)](https://docs.docker.com/engine/reference/builder/#/user)

-----

&nbsp;

### Quickstart

 * Run in Terminal
   * `docker run -i -t -p 9999:9999 codeclou/kartoffelstampf:2.2.0`
 * Open in browser
   * [http://localhost:9999](http://localhost:9999)


-----

&nbsp;

### Preview

[![](https://codeclou.github.io/kartoffelstampf/img/demo.gif?v2)](https://github.com/codeclou/kartoffelstampf/)


-----

&nbsp;

### Features

 * Lossless PNG Compression powered by [optipng](https://de.wikipedia.org/wiki/OptiPNG)
 * Lossless JPG compression powered by [jpegoptim](https://github.com/tjko/jpegoptim)

-----

&nbsp;

### Prerequisites

 * Runs as non-root with fixed UID 10777 and GID 10777. See [howto prepare volume permissions](https://github.com/codeclou/doc/blob/master/docker/README.md).
 * See [howto use SystemD for named Docker-Containers and system startup](https://github.com/codeclou/doc/blob/master/docker/README.md).

-----


&nbsp;

### License

Dockerfile and Image is provided under [MIT License](https://github.com/codeclou/kartoffelstampf/blob/master/LICENSE.md)

-----

&nbsp;

### Appendix

 * [Technical Documentation](./README_TECHDOC.md)
