import { 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand,
  ListObjectsV2Command
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { s3Client, S3_BUCKET_NAME } from '../config/s3';

export interface FileItem {
  key: string;
  fileName: string;
  lastModified?: string;
  size?: number;
}

export interface UploadUrlResponse {
  uploadUrl: string;
  key: string;
  fileName: string;
}

export interface DownloadUrlResponse {
  downloadUrl: string;
  key: string;
}

export class S3Service {
  /**
   * Generate presigned URL for file upload
   */
  async generateUploadUrl(fileName: string, fileType: string): Promise<UploadUrlResponse> {
    const key = `uploads/${uuidv4()}-${fileName}`;
    
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return {
      uploadUrl,
      key,
      fileName,
    };
  }

  /**
   * Generate presigned URL for file download
   */
  async generateDownloadUrl(key: string): Promise<DownloadUrlResponse> {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
    });

    const downloadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return {
      downloadUrl,
      key,
    };
  }

  /**
   * List all files in the S3 bucket
   */
  async listFiles(): Promise<FileItem[]> {
    const command = new ListObjectsV2Command({
      Bucket: S3_BUCKET_NAME,
      Prefix: 'uploads/',
    });

    const response = await s3Client.send(command);
    
    return response.Contents?.map(item => ({
      key: item.Key!,
      lastModified: item.LastModified?.toISOString(),
      size: item.Size,
      fileName: item.Key?.replace('uploads/', '') || '',
    })) || [];
  }

  /**
   * Delete a file from S3
   */
  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  }
}
