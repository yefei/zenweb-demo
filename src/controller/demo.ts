import { Router } from 'zenweb';
export const router = new Router({ prefix: '/demo' });

/**
 * @api {get} /demo
 */
router.get('/', async ctx => {
  ctx.success(ctx.service.demoService.sayHello());
});

/**
 * @api {get} /demo/helper
 */
router.get('/helper', async ctx => {
  // 注意观察data结果类型
  const data = ctx.helper.query({
    id: '!int',
    num: 'int',
    strlist: 'string[]',
    age: {
      type: 'int',
      validate: {
        gt: 10,
        lt: 100,
      }
    }
  });
  ctx.success(data);
});

/**
 * 上传演示
 */
router.post('/upload', async ctx => {
  console.log('form:', ctx.request.body);
  console.log('files:', ctx.request.files);
  ctx.success('upload file');
});
