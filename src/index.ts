import { create } from 'zenweb';
import mysql from '@zenweb/mysql';
import form from '@zenweb/form';
import grid from '@zenweb/grid';
import cors from '@zenweb/cors';
import orm from '@zenweb/orm';
import upload from '@zenweb/upload';
import dbConfig from './config/db';
import { ModelQueries } from './model';

// 创建 zenweb 实例
export const app = create({
  result: {
    failCode: 500,
    failStatus: 200,
    success(ctx, data) {
      return { code: 200, data };
    }
  },
});

// 加载需要使用到的模块
app.setup(cors({ origin: '*' }));
app.setup(mysql(dbConfig.mysql));
app.setup(orm({ Queries: ModelQueries }));
app.setup(upload());
app.setup(form());
app.setup(grid());

// 启动 web 服务
app.start();
