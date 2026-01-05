import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { configDotenv } from 'dotenv';
import connDB from './config/db.js';

// Import your routes
import apiRoutes from './routes/apiRoutes.js';
import authRoutes from './routes/authRoutes.js'; // NOW THIS WORKS
import { protect } from './middleware/authMiddleware.js';

configDotenv();
await connDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: [
        process.env.CLIENT_URL, // Allow Vercel
        "http://localhost:5173"
    ],
    credentials: true
}));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Register the routes
app.use('/api/notes', protect, apiRoutes);
app.use('/api/auth', authRoutes); // This enables the login route

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});




// import express from 'express';
// import cors from 'cors';
// import apiRoutes from './routes/apiRoutes.js';
// import { configDotenv } from 'dotenv';
// import connDB from './config/db.js';
// import { protect } from './middleware/authMiddleware.js';
// import { googleLogin } from './controllers/authController.js';

// // Connect to MongoDB database
// await connDB();

// configDotenv(); // Load environment variables from.env file
// const app = express();
// const port = process.env.PORT || 3000;

// const authRouter = express.Router();
// // Middleware for parsing JSON request bodies
// app.use(cors({ origin: 'http://localhost:5173' }));
// app.use(express.json());

// authRouter.post('/google', googleLogin);
// app.use('/api/auth', authRouter);
// app.use('/api/notes', protect, apiRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });