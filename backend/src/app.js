import express from 'express';
import morgan from 'morgan';
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
import authRouter from './routes/auth.js';
import cors from 'cors';
import todoRouter from './routes/todoRouter.js';

const frontendUrl = 'http://localhost:3000';

app.use(
  cors({
    origin: [frontendUrl],
    credentials: true,
  }),
);

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);

export default app;
