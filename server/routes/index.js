/**
 * Licensed under MIT License
 * Copyright (c) 2017 Bernhard Grünewaldt
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: '/opt/npm/uploads/' });
const exec = require('child_process').exec;
const fs = require('fs');

router.get('/', (req, res, next) => {
  res.render('index');
});

let cpUpload = upload.fields([{ name: 'file', maxCount: 1 }]);
router.post('/upload', cpUpload, (req, res, next) => {
  const uploadedFile = req.files['file'][0];
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(uploadedFile));
});

const _fileStat = (filePath) => {
  const fd = fs.openSync(filePath, 'r+');
  const fileStat = fs.fstatSync(fd);
  fs.closeSync(fd);
  return fileStat;
};

router.get('/compress/lossless-png/:filename/:originalFilenameEncoded', (req, res, next) => {
  const filename = req.params.filename;
  const originalFilenameEncoded = req.params.originalFilenameEncoded;
  const filePath = '/opt/npm/uploads/' + filename;

  exec('optipng -o2 ' + filePath, (error, stdout, stderr) => {
    res.setHeader('Content-Type', 'application/json');
    if (!error) {
      const fileStat = _fileStat(filePath);
      res.send(JSON.stringify({
        compressedSize: fileStat['size'],
        downloadUrl: '/download/' + filename + '/' + originalFilenameEncoded
      }));
    } else {
      res.status(400);
      res.send(JSON.stringify({
        error: 'failed optipng',
        message: stderr
      }));
    }
  });
});

router.get('/download/:filename/:originalFilenameEncoded', (req, res, next) => {
  const filename = req.params.filename;
  const originalFilename = decodeURIComponent(req.params.originalFilenameEncoded);
  const filePath = '/opt/npm/uploads/' + filename;
  res.download(filePath, originalFilename);
});

module.exports = router;