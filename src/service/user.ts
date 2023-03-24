import { InsertRow } from "zenorm";
import { Context, inject } from "zenweb";
import { Profile, User } from "../model";

export default class UserService {
  @inject ctx!: Context;

  getLastUser() {
    return User.find().order("-id").get();
  }

  create(data: InsertRow<User>) {
    return this.ctx.mysql.transaction(async (q) => {
      const id = await User.query(q).create(data);
      await Profile.query(q).create({
        id,
      });
      return id;
    });
  }
}
