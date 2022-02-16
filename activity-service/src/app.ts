import express from 'express';
import cors from 'cors';
import activitiesRouter from './controllers/activity';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/activities", activitiesRouter);

export default app;