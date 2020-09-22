import Router from '@koa/router';
import { moviesRouter } from './movies';
import { reviewsRouter } from './reviews';

export const router = Router();

router.get('/', async (ctx) => {
  ctx.body = { you: '<- are here !' };
});

router.use('/movies', moviesRouter.routes(), moviesRouter.allowedMethods());
router.use('/reviews', reviewsRouter.routes(), reviewsRouter.allowedMethods());
