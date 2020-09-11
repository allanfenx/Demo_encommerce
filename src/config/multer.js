const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

module.exports = {

    dest: path.resolve(__dirname, "..", "public", "upload"),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "public", "upload"))
        },
        filename: (req, file, cb) => {
            const hash = crypto.randomBytes(16).toString('hex');

            const fileName = `${hash}-${file.originalname}`;

            cb(null, fileName);
        }
    }),
    limits: {
        fileSize: 4 * 1024 * 1024
    },
    filefilter: (req, file, cb) => {
        const alowedMines = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if (alowedMines.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type"));
        }
    }
};