'use strict';

const app = require('..');
const router = app.router;

/**
 * @api {get} / 用于部署状态检查
 */
router.get('/', async ctx => {
  ctx.success(ctx.service.demoService.sayHello());
});

/**
 * @api {get} /test 测试
 */
router.get('/test', async ctx => {
  const count = await ctx.model.admin.count();
  ctx.success({ count });
});
