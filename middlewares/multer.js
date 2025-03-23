// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images')
//   },
//   filename: (req, file, cb) => {
//     const randNum = Date.now().toString() + '_' + Math.round(Math.random() * 1E9);
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `IMG_${randNum}.${ext}`)
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true)
//   } else {
//     new Error('Invalid file format: Images Only')
//   }
// };

// const limits = {
//   limits: 1024 * 1024 * 10
// };

// const uploads = multer({
//   storage,
//   fileFilter,
//   limits
// });

// module.exports = uploads;


const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Ensure the ./images directory exists
const imageDir = path.join(__dirname, '../images'); // Adjust path as necessary
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
  console.log('Directory "images" created.');
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    const randNum = Date.now().toString() + '_' + Math.round(Math.random() * 1E9);
    const ext = file.mimetype.split('/')[1];
    cb(null, `IMG_${randNum}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format: Images Only'), false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 10, // 10 MB limit
};

const uploads = multer({ storage, fileFilter, limits });

module.exports = uploads;
