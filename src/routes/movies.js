import Router from '@koa/router';
import { findAllMovies, findMovie, insertMovie, updateMovie } from '../database';
import { zodValidator } from '../middlewares/zodValidator';
import * as z from 'zod';

export const moviesRouter = Router();

moviesRouter.get('/', async (ctx) => {
  const movies = await findAllMovies();
  ctx.body = movies;
});

moviesRouter.post(
  '/',
  zodValidator(
    z.object({
      title: z.string().nonempty(),
      year: z.number().int(),
      posterUrl: z.string().optional(),
    })
  ),
  async (ctx) => {
    const { title, year, posterUrl = null } = ctx.request.body;
    const movie = await insertMovie(title, year, posterUrl);
    ctx.body = movie;
  }
);

moviesRouter.put(
  '/',
  zodValidator(
    z.object({
      title: z.string().nonempty().optional(),
      year: z.number().int().optional(),
      posterUrl: z.string().optional(),
    })
  ),
  async (ctx) => {
    const { movieId } = ctx.params;
    const { title, year, posterUrl } = ctx.request.body;
    const movie = await updateMovie(movieId, { title, year, posterUrl });
    ctx.body = movie;
  }
);

moviesRouter.get('/:movieId', async (ctx) => {
  const { movieId } = ctx.params;
  const movie = await findMovie(movieId);
  if (!movie) {
    return ctx.throw(404, 'Movie not found');
  }
  ctx.body = movie;
});
