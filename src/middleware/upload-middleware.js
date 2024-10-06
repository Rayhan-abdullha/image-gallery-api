const multer = require('multer');
const path = require('path');
const uniqid = require('uniqid');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './uploads'); // Upload folder
  },
  filename: (_req, file, cb) => {
    cb(null, uniqid() + path.extname(file.originalname));
  }
});

// File filter to ensure only images are uploaded
const fileFilter = (_req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png) are allowed!'));
  }
};

// Configure multer with storage and file filter
const upload = multer({ 
  storage, 
  fileFilter 
});

module.exports = {
    upload
}