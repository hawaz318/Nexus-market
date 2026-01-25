const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

exports.uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'nexus-mart/stores' }, (error, result) => {
      if (error) reject(error);
      resolve(result.secure_url); // This is the URL we save to MongoDB
    }).end(fileBuffer);
  });
};