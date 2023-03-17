// zenorm 自动生成文件
// 请不要修改此文件，因为此文件在每次重新生成数据库结构时会被覆盖
// create at: 2023/3/17 16:39:36
// create by: yefei@-
// database: test
import _Global from './_global';

export class MessageTable extends _Global {
  static columns = ["id","user_id","content"];
  /**
   * type: int(11)
   * collation: null
   * null: NO
   * default: null
   * extra: auto_increment
   */
  id?: number;
  /**
   * type: int(11)
   * collation: null
   * null: NO
   * default: null
   */
  user_id!: number;
  /**
   * type: varchar(255)
   * collation: utf8_general_ci
   * null: YES
   * default: null
   */
  content?: string | null;
}

export class ProfileTable extends _Global {
  static columns = ["id","edu","work"];
  /**
   * type: int(11)
   * collation: null
   * null: NO
   * default: null
   * extra: auto_increment
   */
  id?: number;
  /**
   * type: varchar(255)
   * collation: utf8_general_ci
   * null: YES
   * default: null
   */
  edu?: string | null;
  /**
   * type: varchar(255)
   * collation: utf8_general_ci
   * null: YES
   * default: null
   */
  work?: string | null;
}

export class UploadTable extends _Global {
  static columns = ["id","user_id","url","created_at","deleted_at"];
  /**
   * type: int(10) unsigned
   * collation: null
   * null: NO
   * default: null
   * extra: auto_increment
   */
  id?: number;
  /**
   * 用户id
   * type: int(10) unsigned
   * collation: null
   * null: NO
   * default: null
   */
  user_id!: number;
  /**
   * 文件链接
   * type: varchar(255)
   * collation: utf8_general_ci
   * null: YES
   * default: null
   */
  url?: string | null;
  /**
   * 创建日期
   * type: datetime
   * collation: null
   * null: NO
   * default: CURRENT_TIMESTAMP
   */
  created_at?: Date;
  /**
   * 删除日期
   * type: datetime
   * collation: null
   * null: YES
   * default: null
   */
  deleted_at?: Date | null;
}

export class UserTable extends _Global {
  static columns = ["id","avatar_id","name","birthday","created_at","updated_at"];
  /**
   * type: int(11)
   * collation: null
   * null: NO
   * default: null
   * extra: auto_increment
   */
  id?: number;
  /**
   * 头像upload关联id
   * type: int(10) unsigned
   * collation: null
   * null: YES
   * default: null
   */
  avatar_id?: number | null;
  /**
   * 姓名
   * type: varchar(255)
   * collation: utf8_general_ci
   * null: NO
   * default: null
   */
  name!: string;
  /**
   * 生日
   * type: date
   * collation: null
   * null: YES
   * default: null
   */
  birthday?: Date | null;
  /**
   * type: datetime
   * collation: null
   * null: NO
   * default: CURRENT_TIMESTAMP
   */
  created_at?: Date;
  /**
   * type: datetime
   * collation: null
   * null: NO
   * default: CURRENT_TIMESTAMP
   * extra: on update CURRENT_TIMESTAMP
   */
  updated_at?: Date;
}
