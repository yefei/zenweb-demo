// zenorm 自动生成文件
// 请不要修改此文件，因为此文件在每次重新生成数据库结构时会被覆盖
// create at: 2023/3/17 16:39:36
// create by: yefei@-
// database: test
import { QueryParam } from 'zenorm';
import Message from './message';
import Profile from './profile';
import Upload from './upload';
import User from './user';

export class ModelQueries {
  constructor(private _query: QueryParam) {}
  get message() { return Message.query(this._query); }
  get profile() { return Profile.query(this._query); }
  get upload() { return Upload.query(this._query); }
  get user() { return User.query(this._query); }
}

export {
  Message,
  Profile,
  Upload,
  User,
};

declare module '@zenweb/core' {
  interface Context {
    model: ModelQueries;
  }
}
