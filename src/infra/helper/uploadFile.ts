import { Request } from 'express';
import multer from 'multer';
import * as path from 'path';

export const multerConfig = {
  storage: multer.diskStorage({
    destination: function(_req, _file, cb) {
      const uploadPath = path.join(__dirname, '../../../uploads');
      cb(null, uploadPath);
    },
    filename: function(_req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: function(_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'audio/mpeg'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  }
};
