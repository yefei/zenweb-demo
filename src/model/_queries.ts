// zenorm 自动生成文件
// 请不要修改此文件，因为此文件在每次重新生成数据库结构时会被覆盖
// create at: 2022-3-2 11:52:55 ├F10: AM┤
// create by: yefei@-
// database: test
import { Query, createRepositoryQuery } from 'zenorm';
import * as _tables from './_tables';
import Message from './message';
import Profile from './profile';
import Upload from './upload';
import User from './user';

export const MessageQuery = createRepositoryQuery<Message, _tables.MessageTable, number>(Message);
export const ProfileQuery = createRepositoryQuery<Profile, _tables.ProfileTable, number>(Profile);
export const UploadQuery = createRepositoryQuery<Upload, _tables.UploadTable, number>(Upload);
export const UserQuery = createRepositoryQuery<User, _tables.UserTable, number>(User);

export class Queries {
  _query: Query;
  constructor(query: Query) { this._query = query; }
  get message() { return MessageQuery(this._query); }
  get profile() { return ProfileQuery(this._query); }
  get upload() { return UploadQuery(this._query); }
  get user() { return UserQuery(this._query); }
}

export {
  Message,
  Profile,
  Upload,
  User,
};

declare module 'koa' {
  interface DefaultContext {
    model: Queries;
  }
}
