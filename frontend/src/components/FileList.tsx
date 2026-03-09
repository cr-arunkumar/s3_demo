import React, { useState } from 'react';
import { FileItem } from '../types';

interface FileListProps {
  files: FileItem[];
  onFileDeleted: () => void;
  onError: (message: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onFileDeleted, onError }) => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'Unknown size';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleString();
  };

  const handleDownload = async (file: FileItem) => {
    try {
      setDownloading(file.key);

      const response = await fetch(`/api/s3/download-url/${encodeURIComponent(file.key)}`);
      
      if (!response.ok) {
        throw new Error('Failed to get download URL');
      }

      const { downloadUrl } = await response.json();
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Download failed');
    } finally {
      setDownloading(null);
    }
  };

  const handleDelete = async (file: FileItem) => {
    if (!window.confirm(`Are you sure you want to delete "${file.fileName}"?`)) {
      return;
    }

    try {
      setDeleting(file.key);

      const response = await fetch(`/api/s3/${encodeURIComponent(file.key)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      onFileDeleted();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  if (files.length === 0) {
    return <p>No files uploaded yet.</p>;
  }

  return (
    <ul className="file-list">
      {files.map((file) => (
        <li key={file.key} className="file-item">
          <div className="file-info">
            <div className="file-name">{file.fileName}</div>
            <div className="file-meta">
              {formatFileSize(file.size)} • {formatDate(file.lastModified)}
            </div>
          </div>
          <div className="file-actions">
            <button
              className="btn"
              onClick={() => handleDownload(file)}
              disabled={downloading === file.key}
            >
              {downloading === file.key ? 'Downloading...' : 'Download'}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(file)}
              disabled={deleting === file.key}
            >
              {deleting === file.key ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
