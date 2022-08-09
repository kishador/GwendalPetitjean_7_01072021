const multer = require('multer');

const MIME_TYPES = {
  'images/jpg': 'jpg',
  'images/jpeg': 'jpg',
  'images/png': 'png',
  'images/gif': 'gif'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = file.mimetype.split('image/')
    callback(null, name + Date.now() + '.'+extension[1]);
  }
});

module.exports = multer({storage: storage}).single('image');