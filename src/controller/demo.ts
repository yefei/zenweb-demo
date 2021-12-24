import { Router } from 'zenweb';
export const router = new Router({ prefix: '/demo' });

/**
 * @api {get} /demo
 */
router.get('/', async ctx => {
  ctx.success(ctx.service.demoService.sayHello());
});

/**
 * 上传演示
 */
router.post('/upload', async ctx => {
  console.log('form:', ctx.request.body);
  console.log('files:', ctx.request.files);
  ctx.success('upload file');
});
