import express from 'express';
import cors from 'cors';
import eventosRouter from './routes/eventos.js';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/eventos', eventosRouter);

app.listen(3001, () => console.log("API na porta 3001"));