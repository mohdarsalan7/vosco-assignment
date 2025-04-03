import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/auth.js';
import todoRouter from './routes/todoRouter.js';

const app = express();

// Define frontend URLs
const frontendUrl1 = 'http://localhost:3000';
const frontendUrl2 = 'https://vosco-assignment-one.vercel.app/';

// CORS Middleware
app.use(
  cors({
    origin: [frontendUrl1, frontendUrl2], // Allow both local and deployed frontend
    credentials: true, // Allow cookies and auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Global CORS Headers (For extra safety)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', frontendUrl2); // Allow frontend origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Pre-flight request
  }
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);

export default app;
