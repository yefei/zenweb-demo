import { Context, mapping } from "zenweb";

/**
 * 这是一个最简单的控制，一切只需要 export 一个 class 即可
 */
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
