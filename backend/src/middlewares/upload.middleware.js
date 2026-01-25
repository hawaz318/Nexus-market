const multer = require('multer');

// Store image in memory temporarily before sending to Cloudinary
const storage = multer.memoryStorage();

// Advanced: Filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Middleware for a single image (Store Logo)
exports.uploadStoreLogo = upload.single('logo');

// Middleware for multiple images (Product Gallery)
exports.uploadProductPhotos = upload.array('images', 5);