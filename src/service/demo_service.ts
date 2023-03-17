import { Context, inject } from "zenweb";
import { OtherService } from "./other_service";

/**
 * 这是一个最简单的 Service
 * 只需要 export 一个 class 即可
 */
export class DemoService {
  /**
   * 如果需要使用请求上下文 Context 对象，只需要使用 @inject 进行依赖注入即可
   */
  @inject ctx!: Context;

  /**
   * 如果需要依赖其他 Service，直接 import 后 @inject 即可
   */
  @inject otherService!: OtherService;

  sayHello() {
    return 'Hello: ' + this.ctx.ip;
  }

  getOtherName() {
    return this.otherService.getName();
  }
}
