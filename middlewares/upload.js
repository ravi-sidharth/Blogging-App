const multer  = require('multer')

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        if (mimeType) {
            return cb(null, true);
        }
        cb(new Error('Invalid file type'));
    }
});

module.exports = upload;
