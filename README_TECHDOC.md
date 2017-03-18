
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
# 69MPix ~ 20GB Ram

guetzli hires.png hires_comp.jpg

#------

wget -O hires2.jpg https://codeclou.github.io/kartoffelstampf/test-images/test-sony-alpha-6000-hires.JPG
# 24MPix ~ 7GB Ram

convert hires2.jpg hires2.png
guetzli --quality 84 --verbose hires2.png hires2_comp.jpg
```

 * :bangbang: guetzli consumes a lot of RAM. 
 * 1 MPix equals 300 MB of ram. So we need to do the following before startign a conversion:
  * (1) determine MPix of img 
    * via exiftool: `exiftool -Megapixels hires.jpg -T` (only working if metadata is present!)
    * via imagemagick: `identify hires.jpg`
     * `hires.jpg JPEG 8333x8333 8333x8333+0+0 8-bit sRGB 4.04MB 0.000u 0:00.000`
     * Now we do `8333 x 8333 / 1000000` = 69MPix
  * (2) check how much ram is available
  * (3) calculate if it is within ram capacity to start conversion
   * `69 MPix * 300MB/MPix / 1024 = 20 GB`  
 

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