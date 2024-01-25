const multer = require('multer');
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const directory = 'public/uploads/profile-pictures';
        fs.mkdirSync(directory, { recursive: true }) // make directory if it doesnt exist 
        cb(null, directory)
    },
    filename: function (req, file, cb) {
        cb(null, 'profile-' + Date.now() + path.extname(file.originalname)) // create file name
    }
});

// create instance of multer with storage defined above
const multerMiddleware = multer({ storage: storage })

const uploadMiddleware = (req, res, next) => {
    multerMiddleware.single('profilePicture')(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        next();
    });
};

module.exports = uploadMiddleware 