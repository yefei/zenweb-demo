import { InsertRow } from "zenorm";
import { Context, inject } from "zenweb";
import { ProfileQuery, UserQuery, UserTable } from "../model";

export default class UserService {
  @inject
  ctx: Context;

  getLastUser() {
    return this.ctx.model.user.find().order("-id").get();
  }

  create(data: InsertRow<UserTable>) {
    return this.ctx.db.transaction(async (q) => {
      const id = await UserQuery(q).create(data);
      await ProfileQuery(q).create({
        id,
      });
      return id;
    });
  }
}
