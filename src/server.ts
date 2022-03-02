import http from 'http';
import express, { Express } from 'express';
import routes from './routes/router';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
var moesif = require('moesif-nodejs');

dotenv.config();

mongoose.connect(process.env.DATABASE_URL ?? '');

const moesifMiddleware = moesif({
  applicationId:
    'eyJhcHAiOiIxMDkxOjQwIiwidmVyIjoiMi4wIiwib3JnIjoiMjYyOjYwNSIsImlhdCI6MTY0NjA5MjgwMH0.4bWnDVC4bCzPbcR-sB5C2CTVwGUPDs29d9GyCfThXrc',
});

const app: Express = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(moesifMiddleware);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization'
  );
  next();
});

app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use('/', routes);
app.use((req, res) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 5000;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);

export default app;
