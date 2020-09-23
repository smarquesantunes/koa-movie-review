import Router from '@koa/router';
import { findAllMovies, findMovie, insertMovie, updateMovie } from '../database';
import { zodBodyValidator } from '../middlewares/zodBodyValidator';
import * as z from 'zod';
import { allUndefined } from '../utils';

export const moviesRouter = Router();

moviesRouter.get('/', async (ctx) => {
  const movies = await findAllMovies();
  ctx.body = movies;
});

moviesRouter.post(
  '/',
  zodBodyValidator(
    z.object({
      title: z.string().nonempty(),
      year: z.number().int(),
      poster_url: z.string().optional(),
    })
  ),
  async (ctx) => {
    const { title, year, poster_url = null } = ctx.request.body;
    const movie = await insertMovie(title, year, poster_url);
    ctx.body = movie;
  }
);

moviesRouter.put(
  '/:movieId',
  zodBodyValidator(
    z.object({
      title: z.string().nonempty().optional(),
      year: z.number().int().optional(),
      poster_url: z.string().optional(),
    })
  ),
  async (ctx) => {
    const { movieId } = ctx.params;
    const { title, year, poster_url } = ctx.request.body;
    if (allUndefined(title, year, poster_url)) {
      return ctx.throw(400, 'Empty update');
    }
    const movie = await updateMovie(movieId, { title, year, poster_url });
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
