import { create } from 'zenweb';
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

/*
  sentry: process.env.SENTRY_DSN ? { dsn: process.env.SENTRY_DSN } : null,
  cors: { origin: '*' },
  mysql: dbConfig.mysql,
  messageCode: {},
  orm: {},
  form: {},
  */

app.start();
