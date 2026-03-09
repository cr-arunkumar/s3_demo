import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/s3';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/s3', router);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'S3 Demo Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
