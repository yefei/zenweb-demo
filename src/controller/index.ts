import { Context, mapping } from "zenweb";

export class Index {
  /**
   * @api {get} / 用于部署状态检查
   */
  @mapping()
  index(ctx: Context) {
    ctx.success("Hello ZenWeb!");
  }

  @mapping()
  error(ctx: Context) {
    throw new Error("ERROR");
  }
}
