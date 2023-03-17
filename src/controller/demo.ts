import { Upload } from "@zenweb/upload";
import { controller, mapping, QueryHelper } from "zenweb";
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
  index(demoService: DemoService) {
    return demoService.sayHello();
  }

  /**
   * @api {get} /demo/helper
   */
  @mapping()
  helper(qh: QueryHelper) {
    // 注意观察data结果类型
    const data = qh.get({
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
    return data;
  }

  /**
   * 上传演示
   */
  @mapping({ method: "POST" })
  upload(upload: Upload) {
    console.log("fields:", upload.fields);
    console.log("files:", upload.files);
    return "upload file";
  }
}
