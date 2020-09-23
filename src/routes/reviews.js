import Router from '@koa/router';
import { movieExist, insertReview, updateMovie, findMovieReviews } from '../database';
import { zodBodyValidator } from '../middlewares/zodBodyValidator';
import { zodQueryValidator } from '../middlewares/zodQueryValidator';
import * as z from 'zod';
import { allUndefined } from '../utils';

export const reviewsRouter = Router();

reviewsRouter.post(
  '/',
  zodBodyValidator(
    z.object({
      movieId: z.string().uuid(),
      author: z.string().nonempty(),
      rating: z.number().int().min(0).max(100),
      comment: z.string(),
    })
  ),
  async (ctx) => {
    const { movieId, author, rating, comment } = ctx.request.body;
    if (!(await movieExist(movieId))) {
      return ctx.throw(404, 'Movie not found');
    }
    const review = await insertReview(movieId, author, rating, comment);
    ctx.body = review;
  }
);

reviewsRouter.put(
  '/:reviewId',
  zodBodyValidator(
    z.object({
      author: z.string().nonempty().optional(),
      rating: z.number().int().min(0).max(100).optional(),
      comment: z.string().optional(),
    })
  ),
  async (ctx) => {
    const { reviewId } = ctx.params;
    const { author, rating, comment } = ctx.request.body;
    if (allUndefined(author, rating, comment)) {
      return ctx.throw(400, 'Empty update');
    }
    const review = await updateMovie(reviewId, { author, rating, comment });
    ctx.body = review;
  }
);

reviewsRouter.get('/', zodQueryValidator(z.object({ movieId: z.string().uuid() })), async (ctx) => {
  const { movieId } = ctx.request.query;
  const reviews = await findMovieReviews(movieId);
  ctx.body = reviews;
});
