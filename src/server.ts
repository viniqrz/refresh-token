import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';

import { router } from './routes';

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.json({
    status: "Error",
    message: error.message,
  });
});


app.listen(PORT, () => console.log('Server is running...'));