/**
 * Licensed under MIT License
 * Copyright (c) 2017 Bernhard Grünewaldt
 */
const exec = require('child_process').exec;
const fs = require('fs');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const execSync = require('child_process').execSync;

const KartoffelstampfConstants = require('../constants');


class ImageCompressionService {

    //
    // PRIVATE
    //

    _fileStat(filePath) {
        const fd = fs.openSync(filePath, 'r+');
        const fileStat = fs.fstatSync(fd);
        fs.closeSync(fd);
        return fileStat;
    }

    _fileType(filePath) {
        const buffer = readChunk.sync(filePath, 0, 4100);
        return fileType(buffer).mime;
    }

    _isOfAllowedMimeType(filePath) {
        const mimeType = this._fileType(filePath);
        return mimeType === 'image/png' || mimeType === 'image/jpg';
    }

    _isAllowedFilename(filename) {
        return /^[a-zA-Z0-9]*$/.test(filename);
    }

    //
    // PUBLIC
    //

    /**
     * Compress lossless JPG and PNG
     * @param filename
     * @param originalFilenameEncoded
     * @returns {Promise}
     */
    compressLossless(filename, originalFilenameEncoded) {
        const self = this;
        return new Promise((fulfill, reject) => {
            try {
                const filePath = `${KartoffelstampfConstants.uploadDir}/${filename}`;
                if (!self._isAllowedFilename(filename)) throw new Error('filename not allowed');
                if (!self._isOfAllowedMimeType(filePath)) throw new Error('filetype not allowed');
                const pngquantCmd = execSync('pngquant --quality=65-80 --ext _pngquant.png ' + filePath);
                const moveCmd = execSync('cd ' + KartoffelstampfConstants.uploadDir + ' && mv ' + filename + '_pngquant.png ' + filename);
                const optipngCmd= execSync('optipng -o5 ' + filePath);
                const fileStat = self._fileStat(filePath);
                fulfill({
                    compressedSize: fileStat['size'],
                    downloadUrl: '/download/' + filename + '/' + originalFilenameEncoded
                });
            } catch (error) {
                reject({
                    message: 'lossless compression failed with unexpected error',
                    details: error.stack
                });
            }
        });
    }

}

module.exports = ImageCompressionService;