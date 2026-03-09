import { Router } from 'express';
import { S3Controller } from '../controllers/s3Controller';

const router = Router();
const s3Controller = new S3Controller();

// POST /api/s3/upload-url - Generate presigned upload URL
router.post('/upload-url', s3Controller.getUploadUrl.bind(s3Controller));

// GET /api/s3/download-url/:key - Generate presigned download URL
router.get('/download-url/:key', s3Controller.getDownloadUrl.bind(s3Controller));

// GET /api/s3/list - List all files
router.get('/list', s3Controller.listFiles.bind(s3Controller));

// DELETE /api/s3/:key - Delete a file
router.delete('/:key', s3Controller.deleteFile.bind(s3Controller));

export { router };
