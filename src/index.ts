import { create } from 'zenweb';
import mysql from '@zenweb/mysql';
import form from '@zenweb/form';
import grid from '@zenweb/grid';
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

app.setup(mysql(dbConfig.mysql));
app.setup(form());
app.setup(grid());

/*
  sentry: process.env.SENTRY_DSN ? { dsn: process.env.SENTRY_DSN } : null,
  cors: { origin: '*' },
  mysql: dbConfig.mysql,
  messageCode: {},
  orm: {},
  form: {},
  */

app.start();
