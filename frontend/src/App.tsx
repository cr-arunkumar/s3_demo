import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import { FileItem } from './types';
import './App.css';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/s3/list');
      const data = await response.json();
      setFiles(data.files || []);
    } catch (err) {
      setError('Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUploadSuccess = (message: string) => {
    setSuccess(message);
    fetchFiles();
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const handleFileDeleted = () => {
    fetchFiles();
    setSuccess('File deleted successfully');
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>S3 File Manager</h1>
        <p>Upload and download files using AWS S3</p>
      </header>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <section className="upload-section">
        <FileUpload 
          onUploadSuccess={handleUploadSuccess}
          onError={handleError}
        />
      </section>

      <section className="files-section">
        <h2>Uploaded Files</h2>
        {loading ? (
          <div className="loading">Loading files...</div>
        ) : (
          <FileList 
            files={files}
            onFileDeleted={handleFileDeleted}
            onError={handleError}
          />
        )}
      </section>
    </div>
  );
};

export default App;
