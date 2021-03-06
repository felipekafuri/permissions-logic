import 'reflect-metadata';
import express from 'express';
import { router } from './routes/routes';
import './database/index'

const app = express();
app.use(express.json());
app.use(router)

app.listen(3333, () => {
  console.log('Server is running on port http://localhost:3333')
});