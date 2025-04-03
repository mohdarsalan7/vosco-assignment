import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/auth.js';
import todoRouter from './routes/todoRouter.js';

const app = express();

// Define frontend URLs
const frontendUrl1 = 'http://localhost:3000';
const frontendUrl2 = 'https://vosco-assignment-one.vercel.app/';

app.use(cors({ origin: '*' }));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);

export default app;
