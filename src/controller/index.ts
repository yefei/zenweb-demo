import { Router } from 'zenweb';
export const router = new Router();

/**
 * @api {get} / 用于部署状态检查
 */
router.get('/', async ctx => {
  ctx.success('Hello ZenWeb!');
});

router.get('/error', async ctx => {
  throw new Error('ERROR');
});
