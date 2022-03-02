import { data, join, many, model } from 'zenorm';
// 注意导入其他表时必须直接从表定义文件中导入，不能从 '.' 中导入，否则会引发互相依赖问题，造成关联关系 undefined
import Message from './message';
import Profile from './profile';
import Upload from './upload';
import { UserTable } from './_tables';

@model({
  pk: 'id',
  table: 'user',
})
export default class User extends UserTable {
  /**
   * 一对一关联
   */
  @join(Profile, { type: 'OneToOne' })
  profile?: Profile;

  /**
   * 一对多关联，内连查询
   */
  @join(Upload, { fk: 'avatar_id', where: { deleted_at: null } })
  avatar?: Upload;

  /**
   * 一对多，使用单独查询，常用方式，可以单独设置关联数据的查询数量和排序方式，不影响主表的分页
   */
  @many(Message, { find: f => f.limit(10).order('-id') })
  messageList?: Message[];

  /**
   * 一对多，内连查询(JOIN)，非常规方式，使用 JOIN，对于这种查询注意分页问题
   */
  @join(Message, { type: 'OneToMany' })
  messageInnerList?: Message[];

  /**
   * 虚拟数据字段，数据库中并不存在的字段，在ORM 查询结果中会被处理输出
   */
  @data
  get age() {
    return this.birthday ? (new Date().getFullYear()) - this.birthday.getFullYear() : undefined;
  }

  /**
   * set 类型的字段是可选的，如果你想通过更新虚拟数据字段去更新其他字段，可以使用这个办法
   */
  set age(v) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - v, 1, 1);
    this.birthday = date;
  }
}
