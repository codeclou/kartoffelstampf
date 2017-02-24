/**
 * Licensed under MIT License
 * Copyright (c) 2017 Bernhard Grünewaldt
 */
const exec = require('child_process').exec;
const fs = require('fs');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const spawnSync = require('child_process').spawnSync;

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

    isOfAllowedMimeType(filePath) {
        const mimeType = this._fileType(filePath);
        return this.isJpg(mimeType) || this.isPng(mimeType);
    }

    isAllowedFilename(filename) {
        return /^[a-zA-Z0-9]*$/.test(filename);
    }

    isJpg(mimeType) {
        return /^image\/(jpeg|jpg)$/.test(mimeType);
    }

    isPng(mimeType) {
        return /^image\/png$/.test(mimeType);
    }

    execCommand(command, paramArray) {
        const cmd = spawnSync(command, paramArray);
        return {
            command: command + ' ' + paramArray.join(' '),
            stdout: cmd.stdout !== null ? cmd.stdout.toString() : null,
            stderr: cmd.stderr !== null ? cmd.stderr.toString() : null,
            status: cmd.status
        };
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
                const execResults = [];
                const filePath = `${KartoffelstampfConstants.uploadDir}/${filename}`;
                if (!self.isAllowedFilename(filename)) throw new Error('filename not allowed');
                if (!self.isOfAllowedMimeType(filePath)) throw new Error('filetype not allowed');
                const mimeType = self._fileType(filePath);
                if (self.isPng(mimeType)) {
                    execResults.push(self.execCommand('pngquant', [ '--quality=65-80', '--ext _pngquant.png', filePath ]));
                    execResults.push(self.execCommand('mv', [ KartoffelstampfConstants.uploadDir+'/'+filename+'_pngquant.png', KartoffelstampfConstants.uploadDir+'/'+filename ]));
                    execResults.push(self.execCommand('optipng', [ '-o5', filePath ]));
                } else if (self.isJpg(mimeType)) {
                    execResults.push(self.execCommand('jpegoptim', [ '--strip-all', '-f', filePath ]));
                } else {
                    throw new Error(`mimeType not allowed: ${mimeType}`);
                }

                const fileStat = self._fileStat(filePath);
                fulfill({
                    compressedSize: fileStat['size'],
                    downloadUrl: '/download/' + filename + '/' + originalFilenameEncoded,
                    execResults: execResults
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