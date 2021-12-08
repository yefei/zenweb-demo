import { Router } from 'zenweb';
export const router = Router();

/**
 * @api {get} / 用于部署状态检查
 */
router.get('/', async ctx => {
  ctx.success('Hello ZenWeb!');
});
