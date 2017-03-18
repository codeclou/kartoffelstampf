
**Exif-Data Operations**

 * Autorotate JPEG based on exif-data with [exiftran](http://manpages.ubuntu.com/manpages/zesty/man1/exiftran.1.html)
  * `exiftran -ai foo.jpg`
 * Remove all exif-data  
  * `exiftran -di foo.jpg`

**Lossless Compression**

 * Lossless JPG compression with [jpegoptim](https://github.com/tjko/jpegoptim)
  * `jpegoptim foo.jpg`
 * Lossless PNG compression with [pngquant](https://pngquant.org/) and [optipng](https://de.wikipedia.org/wiki/OptiPNG)
  * `pngquant --quality=65-80 --ext _pngquant.png foo.png`
  * `optipng -o5 foo_pngquant.png`

**Lossy Compression / Resizing**

 * Resizing PNG+JPG with [ImageMagick](https://de.wikipedia.org/wiki/ImageMagick)

**Lossy Compression with guetzli**

 * https://github.com/google/guetzli
 * Because of [Issue 40](https://github.com/google/guetzli/issues/40) guetzli gets confused by some Camera JPG files. The workaround mentioned is to convert to png with imagemagick and then pass to guetzli.

```sh
wget -O hires.jpg https://codeclou.github.io/kartoffelstampf/test-images/test-affinity-photo-600dpi.jpg
convert hires.jpg hires.png
guetzli hires.png hires_comp.jpg
```

 * :bangbang: guetzli consumes a lot of RAM. Currently when giving 8GB to Docker Process it is not enought to compress a 4MB 600dpi testfile.
  * Ram Consumption monitored with [cadvisor](https://github.com/google/cadvisor)
  * Result: ![](https://codeclou.github.io/kartoffelstampf/img/guetzli-ram-8gb-killed.png)
  * Also when given 12GB to Docker Process it is not enough!
  
 

**SVG Compression**

 * Clean SVG without Comments with [scour](https://github.com/scour-project/scour)

----

**Releasing and Tagging**

Keep `server/package.json` version in sync. And do:

```
git tag -a 1.0.0 -m "rel 1.0.0"
git push origin 1.0.0
```

----

**Notices**

 * optipng switched to stderr for all output .... hmm
 * Websockets via https://github.com/websockets/ws
 
 
---
 
**Development Run**

```bash
bash runWatch.sh
```

---

TODO

 * Display results of Commandline-Executions
  * Support `ncurses` and other progress-bar thingy stuff.
  * Support ANSI Colors
  * Use Websockets to output line-wise instantly 
 * Introduce Batches with unique IDs
 * Make whole batches downloadable as ZIP
 * Introduce 'create simple webgallery' which generates thumbs, offline index.html and compresses images lossy to websize around 300-500KB
 * Add SVG compression: remove comments, shorten coordinate decimal values a.s.o
 * Create option to only remove meta-data (exif) and to auto-rotate