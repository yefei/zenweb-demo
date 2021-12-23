import { Service } from 'zenweb';

export default class UserService extends Service {
  getLastUser() {
    return this.ctx.model.user.find().order('-id').get();
  }
}
