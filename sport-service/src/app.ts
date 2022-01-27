import express from 'express';
import cors from 'cors';
import sportsRouter from './controllers/sport';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/sports", sportsRouter);

export default app;