'use strict';

const dbConfig = require('./config/db');
const { queries } = require('./model');

const app = module.exports = require('zenweb').create({
  core: {
    proxy: true,
  },
  api: {
    failCode: 500,
    failStatus: 200,
    success(data) {
      return { code: 200, data };
    },
  },
  sentry: process.env.SENTRY_DSN ? { dsn: process.env.SENTRY_DSN } : null,
  // metric: {},
  cors: { origin: '*' },
  validation: {},
  mysql: dbConfig.mysql,
  body: {
    multipart: true, // 上传文件支持
  } 
});

app.defineContextCacheProperty('model', ctx => queries(app.mysql));

app.start();
