import { Context, controller, inject, mapping } from "zenweb";
import UserService from "../service/user";

/**
 * 在这个控制器里演示最基本的增删改查
 */
@controller({
  prefix: "/user",
})
export class UserController {
  @inject userService: UserService;

  /**
   * @api {get} /user
   */
  @mapping()
  async index(ctx: Context) {
    const user = await this.userService.getLastUser();
    ctx.success(user);
  }

  /**
   * @api {post} /user/create 创建一个用户
   * @apiParam  {String} name 姓名
   * @apiParam  {String} [birthday] 生日
   */
  @mapping({ method: "POST" })
  async create(ctx: Context) {
    const data = ctx.helper.body({
      name: "!trim",
      birthday: "date",
    });
    const id = await this.userService.create(data);
    ctx.success({ id });
  }

  /**
   * @api {get} /user/all
   */
  @mapping()
  async all(ctx: Context) {
    const page = ctx.helper.page({ allowOrder: ["id", "created_at"] });
    const all = await ctx.model.user.find().page(page);
    ctx.success(all);
  }

  /**
   * @api {post} /user/:id/send 给用户发送消息
   * @apiParam  {Number} id 用户ID
   * @apiParam  {String} content 内容
   */
  @mapping({ method: "POST", path: "/:id/send" })
  async send(ctx: Context) {
    const { id } = ctx.helper.params({ id: "!int" });
    const { content } = ctx.helper.body({
      content: {
        type: "string",
        required: true,
        validate: {
          minLength: 3,
          maxLength: 200,
        },
      },
    });

    const userExists = await ctx.model.user.findByPk(id).exists();
    if (!userExists) {
      ctx.fail("用户不存在!");
    }

    const messageId = await ctx.model.message.create({
      user_id: id,
      content,
    });

    ctx.success({ messageId });
  }

  /**
   * @api {get} /user/message-list 获取用户的消息列表
   */
  @mapping({ path: "/message-list" })
  async messageList(ctx: Context) {
    const page = ctx.helper.page();
    const messageList = await ctx.model.user
      .find()
      .many("messageList")
      .page(page);
    ctx.success(messageList);
  }
}
