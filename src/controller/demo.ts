import { Context, controller, mapping } from "zenweb";
import { DemoService } from "../service/demo_service";

/**
 * 这是一个控制器，只需 export 导出 class 即可
 * @controller 注解是可选的
 */
@controller({
  prefix: "/demo",
})
export class Demo {
  /**
   * @api {get} /demo
   */
  @mapping()
  index(ctx: Context, demoService: DemoService) {
    ctx.success(demoService.sayHello());
  }

  /**
   * @api {get} /demo/helper
   */
  @mapping()
  helper(ctx: Context) {
    // 注意观察data结果类型
    const data = ctx.helper.query({
      id: "!int",
      num: "int",
      strlist: "string[]",
      age: {
        type: "int",
        validate: {
          gt: 10,
          lt: 100,
        },
      },
    });
    ctx.success(data);
  }

  /**
   * 上传演示
   */
  @mapping({ method: "POST" })
  upload(ctx: Context) {
    console.log("form:", ctx.request.body);
    console.log("files:", ctx.request.files);
    ctx.success("upload file");
  }
}
