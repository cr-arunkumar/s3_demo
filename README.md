# S3 File Upload & Download Demo

A full-stack application demonstrating file upload and download functionality using AWS S3 with TypeScript + Express backend and React frontend.

## Project Structure

```
s3_demo/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── s3.ts          # S3 client configuration
│   │   ├── routes/
│   │   │   └── s3.ts          # S3 API routes
│   │   └── index.ts           # Express server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FileUpload.tsx # File upload component
    │   │   └── FileList.tsx   # File list component
    │   ├── App.tsx            # Main App component
    │   ├── main.tsx           # React entry point
    │   ├── types.ts           # TypeScript types
    │   └── index.css          # Global styles
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## Features

- **File Upload**: Drag & drop or click to select files
- **File Download**: Download files directly from S3
- **File List**: View all uploaded files with metadata
- **File Deletion**: Remove files from S3
- **Presigned URLs**: Secure temporary URLs for upload/download
- **Responsive Design**: Works on desktop and mobile

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- AWS Account with S3 access
- AWS credentials configured

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your AWS credentials:
   ```env
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   S3_BUCKET_NAME=your-s3-bucket-name
   PORT=3001
   ```

4. Build and run the backend:
   ```bash
   npm run build
   npm start
   ```
   
   For development:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## API Endpoints

### Backend Routes

- `POST /api/s3/upload-url` - Get presigned URL for file upload
- `GET /api/s3/download-url/:key` - Get presigned URL for file download
- `GET /api/s3/list` - List all uploaded files
- `DELETE /api/s3/:key` - Delete a file from S3
- `GET /health` - Health check endpoint

## AWS S3 Setup

1. Create an S3 bucket in your AWS console
2. Configure CORS policy for your bucket:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "DELETE"],
       "AllowedOrigins": ["http://localhost:3000"],
       "ExposeHeaders": []
     }
   ]
   ```
3. Ensure your AWS credentials have the necessary permissions:
   - `s3:PutObject`
   - `s3:GetObject`
   - `s3:DeleteObject`
   - `s3:ListBucket`

## Usage

1. Start both backend and frontend servers
2. Open your browser to `http://localhost:3000`
3. Use the upload area to add files
4. View uploaded files in the list
5. Download or delete files as needed

## Security Notes

- AWS credentials are stored in environment variables
- Presigned URLs are temporary (1 hour expiry)
- Files are stored with UUID prefixes to prevent naming conflicts
- CORS is configured to allow only specific origins

## Technologies Used

### Backend
- Node.js
- Express.js
- TypeScript
- AWS SDK v3
- dotenv
- cors

### Frontend
- React 18
- TypeScript
- Vite
- CSS3 (no external CSS framework)

## License

ISC
