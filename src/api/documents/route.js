const express = require('express');
const { upload, download } = require('./controller');

const router = express.Router();

router.post('/upload', upload);
router.get('/download/:filename/:filetype', download);

module.exports = router;
