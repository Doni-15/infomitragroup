import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileTypeFromFile } from 'file-type';

const allowedImageTypes = new Map([
    ['image/jpeg', 'jpg'],
    ['image/png', 'png'],
    ['image/gif', 'gif'],
    ['image/webp', 'webp'],
]);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(process.cwd(), 'uploads');
        
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true, mode: 0o750 });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${crypto.randomUUID()}.upload`);
    }
});

const fileFilter = (req, file, cb) => {
    if (allowedImageTypes.has(file.mimetype)) {
        return cb(null, true);
    }

    cb(new Error('Format file tidak valid! Hanya boleh: jpeg, jpg, png, gif, webp'));
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    fileFilter: fileFilter 
});

export async function validateUploadedImage(req, res, next) {
    if (!req.file) {
        return next();
    }

    try {
        const detected = await fileTypeFromFile(req.file.path);
        const canonicalExtension = detected && allowedImageTypes.get(detected.mime);
        if (!canonicalExtension) {
            fs.rmSync(req.file.path, { force: true });
            return res.status(400).json({
                msg: 'Isi file bukan gambar JPEG, PNG, GIF, atau WebP yang valid.',
            });
        }

        const finalName = `${path.parse(req.file.filename).name}.${canonicalExtension}`;
        const finalPath = path.join(path.dirname(req.file.path), finalName);
        fs.renameSync(req.file.path, finalPath);
        fs.chmodSync(finalPath, 0o640);
        req.file.filename = finalName;
        req.file.path = finalPath;
        req.file.mimetype = detected.mime;
        return next();
    } catch (error) {
        fs.rmSync(req.file.path, { force: true });
        return next(error);
    }
}

export default upload;
