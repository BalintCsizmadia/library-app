import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import indexRouter from './routes/index.ts';
import bookRouter from './routes/books.ts';

import 'dotenv/config';

const app = new Koa();
app.use(logger());
app.use(cors());
app.use(bodyParser());
app.use(indexRouter.routes()).use(indexRouter.allowedMethods());
app.use(bookRouter.routes()).use(bookRouter.allowedMethods());

if (process.env.NODE_ENV !== 'test') {
  const port = parseInt(process.env.PORT || '3000', 10);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;
