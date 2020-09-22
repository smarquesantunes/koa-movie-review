import Router from '@koa/router';
import { findAllMovies, findMovie, insertMovie, insertReview, updateMovie } from '../database';
import { zodValidator } from '../middlewares/zodValidator';
import * as z from 'zod';

export const reviewsRouter = Router();

reviewsRouter.post(
  '/',
  zodValidator(
    z.object({
      movieId: z.string().uuid(),
      author: z.string().nonempty(),
      rating: z.number().int().min(0).max(100),
      comment: z.string(),
    })
  ),
  async (ctx) => {
    const { movieId, author, rating, comment } = ctx.request.body;
    const review = await insertReview(movieId, author, rating, comment);
    ctx.body = review;
  }
);

reviewsRouter.put(
  '/:reviewId',
  zodValidator(
    z.object({
      author: z.string().nonempty().optional(),
      rating: z.number().int().min(0).max(100).optional(),
      comment: z.string().optional(),
    })
  ),
  async (ctx) => {
    const { reviewId } = ctx.params;
    const { author, rating, comment } = ctx.request.body;
    const review = await updateMovie(reviewId, { author, rating, comment });
    ctx.body = review;
  }
);
