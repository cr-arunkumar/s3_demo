export interface FileItem {
  key: string;
  fileName: string;
  lastModified?: string;
  size?: number;
}

export interface UploadResponse {
  uploadUrl: string;
  key: string;
  fileName: string;
}

export interface DownloadResponse {
  downloadUrl: string;
  key: string;
}
