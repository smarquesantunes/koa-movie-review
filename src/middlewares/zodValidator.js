import * as z from 'zod';

export function zodValidator(schema) {
  return async function zodValidatorMiddleware(ctx, next) {
    try {
      ctx.request.body = schema.parse(ctx.request.body);
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return ctx.throw(400, 'Schema validation failed');
      }
      throw error;
    }
  };
}
