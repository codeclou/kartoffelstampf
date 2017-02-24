/**
 * Licensed under MIT License
 * Copyright (c) 2017 Bernhard Grünewaldt
 */
//
// REQUIRE
//
const express = require('express');
const multer = require('multer');
const KartoffelstampfConstants = require('../constants');
const ImageCompressionService = require('../services/ImageCompressionService');

//
// INIT
//
const router = express.Router();
const upload = multer({ dest: KartoffelstampfConstants.uploadDir });
const imageCompressionService = new ImageCompressionService();

//
// INDEX ROUTE
//
const appVersion = require('../package.json').version;
router.get('/', (req, res, next) => {
  res.render('index', {
    appVersion: appVersion
  });
});

//
// FILE-UPLOAD ROUTE
//
let cpUpload = upload.fields([{ name: 'file', maxCount: 1 }]);
router.post('/upload', cpUpload, (req, res, next) => {
  const uploadedFile = req.files['file'][0];
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(uploadedFile));
});

//
// FILE-DOWNLOAD ROUTE
//
router.get('/download/:filename/:originalFilenameEncoded', (req, res, next) => {
  const filename = req.params.filename;
  if (!imageCompressionService.isAllowedFilename(filename)) {
    res.status(400);
    res.send('THERE HAS BEEN A SAUERKRAUT PROBLEM! Filename only [a-zA-Z0-9]*');
  } else {
    const originalFilename = decodeURIComponent(req.params.originalFilenameEncoded);
    const filePath = `${KartoffelstampfConstants.uploadDir}/${filename}`;
    res.download(filePath, originalFilename);
  }
});

//
// LOSSLESS COMPRESSION ROUTE
//
router.get('/compress/lossless/:filename/:originalFilenameEncoded', (req, res, next) => {
  const filename = req.params.filename;
  const originalFilenameEncoded = req.params.originalFilenameEncoded;
  res.setHeader('Content-Type', 'application/json');
  imageCompressionService.compressLossless(filename, originalFilenameEncoded)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((error) => {
      res.status(400);
      res.send(JSON.stringify(error));
    });
});


module.exports = router;