[![](https://codeclou.github.io/kartoffelstampf/img/kartoffelstampf.svg)](https://github.com/codeclou/kartoffelstampf/)


<p>&nbsp;</p>

> Compress, Squash and Stampf your Images in a convenient way. 

Run: `docker run -i -t -p 9999:9999 codeclou/kartoffelstampf:latest`
Open: [http://localhost:9999](http://localhost:9999)

<p>&nbsp;</p>


-----

&nbsp;

### Preview

[![](https://codeclou.github.io/kartoffelstampf/img/demo.gif)](https://github.com/codeclou/kartoffelstampf/)


-----

&nbsp;

### Features

 * Lossless PNG Compression by [optipng](https://de.wikipedia.org/wiki/OptiPNG)


-----

&nbsp;

### Prerequisites

 * Runs as non-root with fixed UID 10777 and GID 10777. See [howto prepare volume permissions](https://github.com/codeclou/doc/blob/master/docker/README.md).
 * See [howto use SystemD for named Docker-Containers and system startup](https://github.com/codeclou/doc/blob/master/docker/README.md).

-----

&nbsp;


### Usage


Start Kartoffelstampf like this.

```bash
docker run \
    -i -t \
    -p 9999:9999 \
    codeclou/kartoffelstampf:latest
```

Now go to [http://localhost:9999](http://localhost:9999) and start to stampf it. 



-----

&nbsp;

### License, Liability & Support

 * [![](https://codeclou.github.io/doc/docker-warranty-notice.svg?v1)](https://github.com/codeclou/kartoffelstampf/blob/master/LICENSE.md)
 * Dockerfile and Image is provided under [MIT License](https://github.com/codeclou/kartoffelstampf/blob/master/LICENSE.md)
  