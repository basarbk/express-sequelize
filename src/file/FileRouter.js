const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer();

router.post('/upload', upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send();
});

module.exports = router;
