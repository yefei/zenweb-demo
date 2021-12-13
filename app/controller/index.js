import { Router } from 'zenweb';
export const router = new Router();

/**
 * @api {get} / 用于部署状态检查
 */
router.get('/', async ctx => {
  ctx.success('Hello ZenWeb!');
});

const GRID = Symbol('Grid');

class GridColumn {
  /**
   * @param {Grid} grid
   * @param {string} prop
   */
  constructor(grid, prop) {
    this[GRID] = grid;
    this.prop = prop;
  }

  label(label) {
    this.label = label;
    return this;
  }

  order() {
    this.sortable = 'custom';
    return this;
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

  column(prop, label) {
    const column = new GridColumn(this, prop);
    if (label) column.label(label);
    this.columns.push(column);
    return column;
  }

  setPageSize(count) {
    this.limit = count;
  }

  orderCheck() {
    // 排序字段检查
    for (let i of order) {
      if (i.startsWith('-')) {
        i = i.slice(1);
      }
      if (!allowOrders.includes(i)) {
        ctx.fail(`不允许的排序字段: ${i}`);
      }
    }
  }

  async fetch(opt) {
    const result = await this.finder.page({
      limit: opt.limit || this.limit,
      offset: opt.offset || 0,
    });
    return {
      columns: this.columns,
      data: result.list,
      total: result.total,
    };
  }
}

router.get('/grid', async ctx => {
  const grid = new Grid(ctx.model.user.find());
  grid.column('id', 'ID').order();
  grid.column('name', '姓名');
  grid.column('birthday', '生日');
  grid.column('created_at', '创建日期').order();
  ctx.success(await grid.fetch(ctx.helper.query({ limit: 'int', offset: 'int' })));
});
