import { create } from 'zenweb';
import mysql from '@zenweb/mysql';
import form from '@zenweb/form';
import grid from '@zenweb/grid';
import cors from '@zenweb/cors';
import dbConfig from './config/db';

export const app = create({
  core: {
    proxy: true,
  },
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
app.setup(form());
app.setup(grid());

/*
  sentry: process.env.SENTRY_DSN ? { dsn: process.env.SENTRY_DSN } : null,
  orm: {},

  */

app.start();
