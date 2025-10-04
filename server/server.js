import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';
import { configDotenv } from 'dotenv';
import connDB from './config/db.js';

// Connect to MongoDB database
await connDB();

configDotenv(); // Load environment variables from.env file
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON request bodies
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/notes', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});