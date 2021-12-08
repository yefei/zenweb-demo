import { Router } from 'zenweb';
export const router = Router({ prefix: '/demo' });

/**
 * @api {get} /demo
 */
router.get('/', async ctx => {
  ctx.success(ctx.service.demoService.sayHello());
});

