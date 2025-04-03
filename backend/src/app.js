import express from 'express';
import morgan from 'morgan';
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
import authRouter from './routes/auth.js';
import cors from 'cors';
import todoRouter from './routes/todoRouter.js';

const frontendUrl1 = 'http://localhost:3000';
const frontendUrl2 = 'https://vosco-assignment-one.vercel.app/';

app.use(
  cors({
    origin: [frontendUrl1, frontendUrl2],
    credentials: true,
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);

export default app;
