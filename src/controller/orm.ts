import { controller, mapping } from "zenweb";
import { User } from "../model";

/**
 * 在这个控制器里演示最基本的增删改查
 */
@controller({
  prefix: "/orm"
})
export class ORMController {
  @mapping()
  async index() {
    return await User.find().all();
  }
}
