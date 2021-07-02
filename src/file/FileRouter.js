const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const upload = multer();

router.post('/upload', upload.single("file"), async (req, res) => {
  const file = req.file;
  await fs.promises.writeFile('./upload-dir/uploaded-file.png', file.buffer);
  res.send();
});

module.exports = router;