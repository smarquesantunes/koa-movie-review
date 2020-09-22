import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyparser from 'koa-bodyparser';
import errorHandler from 'koa-error';
import { setupDatabase } from './database/setup';

export async function main() {
  // setup database before starting the app !
  await setupDatabase();

  const app = new Koa();

  app.use(cors());
  app.use(errorHandler({ accepts: ['json'] }));
  app.use(bodyparser({ enableTypes: ['json'] }));

  const router = Router();

  app.use(router.routes(), router.allowedMethods());

  app.listen(3001, () => {
    console.log(`Server is up on http://localhost:3001`);
  });

  return app;
}
