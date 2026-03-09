const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function testConnection() {
  try {
    console.log('Testing AWS credentials...');
    console.log('Region:', process.env.AWS_REGION);
    console.log('Access Key ID:', process.env.AWS_ACCESS_KEY_ID?.substring(0, 8) + '...');
    
    // Test basic S3 connection
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);
    
    console.log('✅ AWS credentials are valid!');
    console.log('Available buckets:');
    response.Buckets?.forEach(bucket => {
      console.log(`  - ${bucket.Name}`);
    });
    
    // Check if your specific bucket exists
    const targetBucket = process.env.S3_BUCKET_NAME;
    const bucketExists = response.Buckets?.some(bucket => bucket.Name === targetBucket);
    
    if (bucketExists) {
      console.log(`✅ Bucket '${targetBucket}' found!`);
    } else {
      console.log(`❌ Bucket '${targetBucket}' not found!`);
    }
    
  } catch (error) {
    console.error('❌ AWS credentials test failed:');
    console.error('Error:', error.message);
    console.error('Error Code:', error.Code);
    console.error('Error Type:', error.name);
  }
}

testConnection();
