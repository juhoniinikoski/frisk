import express from 'express';
import cors from 'cors';
import locationRouter from './controllers/locations';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/locations", locationRouter);

export default app;