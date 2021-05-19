import multer from 'multer'

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 15000000, // 15 MB
    },
    fileFilter(_, file, cb) {
        if (!file.originalname.match(/\.(jpe?g|png|gif|webp|bmp)$/i)) {
            return cb(new Error("Please only upload images"));
        }
        cb(undefined, true);
    },
});

export default upload