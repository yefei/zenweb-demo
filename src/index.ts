import { create } from 'zenweb';
import mysql from '@zenweb/mysql';
import form from '@zenweb/form';
import grid from '@zenweb/grid';
import cors from '@zenweb/cors';
import orm from '@zenweb/orm';
import dbConfig from './config/db';
import { Queries } from './model';

export const app = create({
  api: {
    failCode: 500,
    failStatus: 200,
    success(ctx, data) {
      return { code: 200, data };
    }
  },
});

app.setup(cors({ origin: '*' }));
app.setup(mysql(dbConfig.mysql));
app.setup(orm({ Queries }));
app.setup(form());
app.setup(grid());

app.start();
