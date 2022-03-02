import { InsertRow } from 'zenorm';
import { Service } from 'zenweb';
import { Profile, ProfileQuery, User, UserQuery, UserTable } from '../model';

export default class UserService extends Service {
  getLastUser() {
    return this.ctx.model.user.find().order('-id').get();
  }

  create(data: InsertRow<UserTable>) {
    return this.ctx.db.transaction(async q => {
      const id = await UserQuery(q).create(data);
      await ProfileQuery(q).create({
        id,
      });
      return id;
    });
  }
}
