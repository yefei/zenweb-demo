import { create } from 'zenweb';
import mysql from '@zenweb/mysql';
import form from '@zenweb/form';
import grid from '@zenweb/grid';
import cors from '@zenweb/cors';
import upload from '@zenweb/upload';
import { bindQuery } from './model';

// 创建 zenweb 实例
export const app = create({
  result: {
    failCode: 500,
    failStatus: 200,
    success(_, data) {
      return { code: 200, data };
    }
  },
});

// 加载需要使用到的模块
app.setup(cors({ origin: '*' }));
app.setup(mysql({
  bindQuery,
  pools: {
    MASTER: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '') || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'test',
      charset: 'utf8mb4',
      timezone: '+08:00',
      connectionLimit: 100,
    },
  }
}));
app.setup(upload());
app.setup(form());
app.setup(grid());

// 启动 web 服务
app.start();
