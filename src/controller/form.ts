import { Context, mapping } from "zenweb";
import { ExampleForm } from "../form/example";

/**
 * 表单生成于数据校验演示，与前端组件 @zenweb/form-vue-element 配合使用
 */
export class FormController {
  /**
   * 合并处理
   */
   @mapping({ method: ['GET', 'POST'] })
   async form(ctx: Context, form: ExampleForm) {
     if (ctx.method === 'GET') {
        form.data = { name: '默认名字' };
     } else {
        // 验证用户提交的数据，如果有问题则直接抛出并终止流程，注意：assert 是一个异步函数
        await form.assert(ctx.request.body);
        return ctx.success(form.data);
     }
     ctx.success(form.result);
   }
}
