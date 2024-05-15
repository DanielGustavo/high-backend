import 'express-async-errors';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';

import handleAppErrorThrowMiddleware from './middlewares/handleAppErrorThrowMiddleware';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(
  '/uploads',
  express.static(path.resolve(__dirname, '..', 'static', 'uploads'))
);
app.use(routes);
app.use(handleAppErrorThrowMiddleware);

app.listen(process.env.APP_PORT, () => {
  console.log(`🔥 Fired server at port ${process.env.APP_PORT}`);
});
