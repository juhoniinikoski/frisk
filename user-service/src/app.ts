import express from 'express';
import cors from 'cors';
import usersRouter from './controllers/users';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);

export default app;