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
        return fileType(buffer);
    }

    _isOfAllowedMimeType(mimeType) {
        return 'image/png' || 'image/jpg';
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
            const filePath = `${KartoffelstampfConstants.uploadDir}/${filename}`;
            try {
                const stdout = execSync('optipng -o2 ' + filePath);
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