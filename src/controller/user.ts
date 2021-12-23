import { Router } from 'zenweb';
export const router = new Router({ prefix: '/user' });

/**
 * @api {get} /demo
 */
router.get('/', async ctx => {
  ctx.success(await ctx.service.user.getLastUser());
});

