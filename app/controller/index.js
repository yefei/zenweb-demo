import { Router } from 'zenweb';
import { Grid } from '@zenweb/grid';
import { fields } from '@zenweb/form';
import moment from 'moment';
export const router = new Router();

/**
 * @api {get} / 用于部署状态检查
 */
router.get('/', async ctx => {
  ctx.success('Hello ZenWeb!');
});

function ageRange(min, max) {
  return {
    $between: [
      moment().subtract(max, 'y').format('YYYY-MM-DD'),
      moment().subtract(min, 'y').format('YYYY-MM-DD'),
    ]
  };
}

router.get('/grid', async ctx => {
  const grid = new Grid(ctx);
  grid.column('id').label('ID').sortable();
  grid.column('name').label('姓名');
  grid.column('birthday').label('生日').render(value => value ? moment(value).format('YYYY-MM-DD') : '无');
  grid.column('created_at').label('注册日期').sortable();
  grid.filter('age', fields.select('年龄段').choices([
    { label: '毛蛋', value: 0 },
    { label: '少年', value: 1 },
    { label: '壮年', value: 2 },
    { label: '中年', value: 3 },
    { label: '老年', value: 4 },
  ])).where(value => [
    { birthday: ageRange(0, 18) },
    { birthday: ageRange(18, 40) },
    { birthday: ageRange(18, 40) },
    { birthday: ageRange(40, 55) },
    { birthday: ageRange(55, 100) },
  ][value]);
  grid.filter('created_at', fields.dateRange('注册日期').end(new Date())).where(value => ({ created_at: { $between: value } }));
  grid.filter('search', fields.trim('关键词搜索')).where(value => ({ name: { $like: `%${value}%` } }));
  grid.setOrder('-id');
  ctx.success(await grid.fetch(ctx.model.user.find()));
});
