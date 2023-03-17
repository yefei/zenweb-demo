import { BodyHelper, Context, controller, inject, mapping, ParamHelper, QueryHelper } from "zenweb";
import UserService from "../service/user";

/**
 * 在这个控制器里演示最基本的增删改查
 */
@controller({
  prefix: "/user",
})
export class UserController {
  @inject userService!: UserService;

  /**
   * @api {get} /user
   */
  @mapping()
  async index() {
    const user = this.userService.getLastUser();
    return user;
  }

  /**
   * @api {post} /user/create 创建一个用户
   * @apiParam  {String} name 姓名
   * @apiParam  {String} [birthday] 生日
   */
  @mapping({ method: "POST" })
  async create(bh: BodyHelper) {
    const data = bh.get({
      name: "!trim",
      birthday: "date",
    });
    const id = await this.userService.create(data);
    return { id };
  }

  /**
   * @api {get} /user/all
   */
  @mapping()
  async all(ctx: Context, qh: QueryHelper) {
    const page = qh.page({ allowOrder: ["id", "created_at"] });
    const all = await ctx.model.user.find().page(page);
    return all;
  }

  /**
   * @api {post} /user/:id/send 给用户发送消息
   * @apiParam  {Number} id 用户ID
   * @apiParam  {String} content 内容
   */
  @mapping({ method: "POST", path: "/:id/send" })
  async send(ctx: Context, ph: ParamHelper, bh: BodyHelper) {
    const { id } = ph.get({ id: "!int" });
    const { content } = bh.get({
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

    return { messageId };
  }

  /**
   * @api {get} /user/message-list 获取用户的消息列表
   */
  @mapping({ path: "/message-list" })
  async messageList(ctx: Context, qh: QueryHelper) {
    const page = qh.page();
    const messageList = await ctx.model.user
      .find()
      .many("messageList")
      .page(page);
    return messageList;
  }
}
