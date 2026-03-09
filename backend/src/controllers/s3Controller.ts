import { Request, Response } from 'express';
import { S3Service } from '../services/s3Service';

export class S3Controller {
  private s3Service: S3Service;

  constructor() {
    this.s3Service = new S3Service();
  }

  /**
   * Handle upload URL generation request
   */
  async getUploadUrl(req: Request, res: Response): Promise<void> {
    try {
      const { fileName, fileType } = req.body;
      
      if (!fileName || !fileType) {
        res.status(400).json({ error: 'fileName and fileType are required' });
        return;
      }

      const result = await this.s3Service.generateUploadUrl(fileName, fileType);
      res.json(result);
    } catch (error) {
      console.error('Error generating upload URL:', error);
      res.status(500).json({ error: 'Failed to generate upload URL' });
    }
  }

  /**
   * Handle download URL generation request
   */
  async getDownloadUrl(req: Request, res: Response): Promise<void> {
    try {
      const { key } = req.params;
      
      if (!key) {
        res.status(400).json({ error: 'key is required' });
        return;
      }

      const result = await this.s3Service.generateDownloadUrl(key);
      res.json(result);
    } catch (error) {
      console.error('Error generating download URL:', error);
      res.status(500).json({ error: 'Failed to generate download URL' });
    }
  }

  /**
   * Handle file listing request
   */
  async listFiles(req: Request, res: Response): Promise<void> {
    try {
      const files = await this.s3Service.listFiles();
      res.json({ files });
    } catch (error) {
      console.error('Error listing files:', error);
      res.status(500).json({ error: 'Failed to list files' });
    }
  }

  /**
   * Handle file deletion request
   */
  async deleteFile(req: Request, res: Response): Promise<void> {
    try {
      const { key } = req.params;
      
      if (!key) {
        res.status(400).json({ error: 'key is required' });
        return;
      }

      await this.s3Service.deleteFile(key);
      res.json({ message: 'File deleted successfully' });
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({ error: 'Failed to delete file' });
    }
  }
}
