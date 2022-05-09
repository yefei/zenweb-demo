import { Context, mapping } from "zenweb";
import { ExampleForm } from "../form/example";

export class FormController {
  /**
   * 合并处理
   */
   @mapping({ method: ['GET', 'POST'] })
   form(ctx: Context, form: ExampleForm) {
     if (ctx.method === 'GET') {
       form.data = { name: '默认名字' };
     } else {
       form.assert(ctx.request.body);
       return ctx.success(form.data);
     }
     ctx.success(form.result);
   }
}
