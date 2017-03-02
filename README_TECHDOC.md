
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