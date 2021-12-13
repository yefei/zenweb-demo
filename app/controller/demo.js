import { Router } from 'zenweb';
export const router = new Router({ prefix: '/demo' });

/**
 * @api {get} /demo
 */
router.get('/', async ctx => {
  ctx.success(ctx.service.demoService.sayHello());
});

