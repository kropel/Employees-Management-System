import express, { Request, Response, Application, NextFunction } from 'express';
import mongoose from 'mongoose';

import cors from 'cors';

import employeeRouter from './employees/routers/employee';
import skillsRouter from './skills/routers/skills';

require('dotenv').config();

function run() {
  if (!process.env.MONGODB_CONNECTION) {
    console.error('MongoDB is not configured');
    return;
  }

  mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const app: Application = express();

  app.use(cors());
  app.use(express.json());

  app.use('/', employeeRouter);
  app.use('/', skillsRouter);

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log('Error:', error);
    res.send(`There was na error: ${error.message}`);
  });

  app.listen(process.env.PORT, () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
    );
  });
}
run();
