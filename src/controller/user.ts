import { Router } from 'zenweb';
export const router = new Router({ prefix: '/user' });

/**
 * @api {get} /user
 */
router.get('/', async ctx => {
  ctx.success(await ctx.service.user.getLastUser());
});

/**
 * @api {post} /user/create 创建一个用户
 * @apiParam  {String} name 姓名
 * @apiParam  {String} [birthday] 生日
 */
router.post('/create', async ctx => {
  const data = ctx.helper.body({
    name: '!trim',
    birthday: 'date',
  });
  const id = await ctx.service.user.create(data);
  ctx.success({ id });
});

/**
 * @api {get} /user/all
 */
router.get('/all', async ctx => {
  const page = ctx.helper.page({ allowOrder: ['id', 'created_at'] });
  const all = await ctx.model.user.find().page(page);
  ctx.success(all);
});

/**
 * @api {post} /user/:id/send 给用户发送消息
 * @apiParam  {Number} id 用户ID
 * @apiParam  {String} content 内容
 */
router.post('/:id/send', async ctx => {
  const { id } = ctx.helper.params({ id: '!int' });
  const { content } = ctx.helper.body({
    content: {
      type: 'string',
      required: true,
      validate: {
        minLength: 3,
        maxLength: 200,
      }
    },
  });
  
  const userExists = await ctx.model.user.findByPk(id).exists();
  if (!userExists) {
    ctx.fail('用户不存在!');
  }

  const messageId = await ctx.model.message.create({
    user_id: id,
    content,
  });

  ctx.success({ messageId });
});

/**
 * @api {get} /user/message-list 获取用户的消息列表
 */
router.get('/message-list', async ctx => {
  const page = ctx.helper.page();
  const messageList = await ctx.model.user.find().many('messageList').page(page);
  ctx.success(messageList);
});
