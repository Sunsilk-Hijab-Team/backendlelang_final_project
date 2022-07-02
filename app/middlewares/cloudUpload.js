//cloudinar uploaded image config
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dckrcrjyo',
    api_key: 843749812497697,
    api_secret: 'V9dMajJ6r-9UP5B5BKS3BL6kF6E',
    secure: true
});
console.log(cloudinary.config());

module.exports = cloudinary;