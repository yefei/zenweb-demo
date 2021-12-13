import { Router } from 'zenweb';
export const router = new Router();

/**
 * @api {get} / 用于部署状态检查
 */
router.get('/', async ctx => {
  ctx.success('Hello ZenWeb!');
});

const GRID = Symbol('GridColumn#grid');
const ATTRS = Symbol('GridColumn#attrs');

class GridColumn {
  /**
   * @param {Grid} grid
   * @param {string} prop
   */
  constructor(grid, prop) {
    this[GRID] = grid;
    this[ATTRS] = { prop };
  }

  get attrs() {
    return this[ATTRS];
  }

  attr(key, value) {
    this[ATTRS][key] = value;
    return this;
  }

  label(label) {
    return this.attr('label', label);
  }

  sortable() {
    return this.attr('sortable', 'custom');
  }
}

class Grid {
  /**
   * @param {import('zenorm').Finder} finder
   */
  constructor(finder) {
    this.finder = finder;
    this.columns = [];
    this.limit = 10;
  }

  column(prop) {
    const column = new GridColumn(this, prop);
    this.columns.push(column);
    return column;
  }

  setPageSize(count) {
    this.limit = count;
  }

  /**
   * 排序字段过滤检查
   * @param {string[]} input
   * @returns 
   */
  orderFilter(input) {
    const order = [];
    const allowOrders = this.columns.filter(i => i.attrs.sortable).map(i => i.attrs.prop);
    for (const i of input) {
      if (allowOrders.includes(i.startsWith('-') ? i.slice(1) : i)) {
        order.push(i);
      }
    }
    return order;
  }

  async fetch(opt) {
    const columns = this.columns.map(i => i.attrs.prop);
    // 排序
    const order = opt.order ? this.orderFilter(opt.order) : [];
    if (order.length) {
      this.finder.order(...order);
    }
    // 分页并取得指定列
    const limit = opt.limit || this.limit;
    const offset = opt.offset || 0;
    const result = await this.finder.page({
      limit,
      offset,
    }, ...columns);
    return {
      columns: this.columns.map(i => i.attrs),
      data: result.list,
      total: result.total,
      limit,
      offset,
    };
  }
}

router.get('/grid', async ctx => {
  const grid = new Grid(ctx.model.user.find());
  grid.column('id').label('ID').sortable();
  grid.column('name').label('姓名');
  grid.column('birthday').label('生日');
  grid.column('created_at').label('创建日期').sortable();
  ctx.success(await grid.fetch(ctx.helper.query({ limit: 'int', offset: 'int', order: 'trim[]' })));
});
