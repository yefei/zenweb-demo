import 'koa';
import 'zenweb';
import '@zenweb/validation';
import './typings/service';
import { Queries } from './app/model';

declare module 'koa' {
  interface BaseContext {
    model: Queries;
  }
}
