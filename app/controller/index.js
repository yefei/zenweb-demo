import { Router } from 'zenweb';
import { Grid } from '@zenweb/grid';
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
  const grid = new Grid();
  grid.column('id').label('ID').sortable();
  grid.column('name').label('姓名');
  grid.column('birthday').label('生日');
  grid.column('created_at').label('注册日期').sortable();
  grid.choice('age').label('年龄段').items(
    { label: '少年', where: { birthday: ageRange(0, 18) } },
    { label: '壮年', where: { birthday: ageRange(18, 40) } },
    { label: '中年', where: { birthday: ageRange(40, 55) } },
    { label: '老年', where: { birthday: ageRange(55, 100) } },
  );
  grid.filter('created_at').label('注册日期').type('date').widget('date');
  grid.setOrder('-id').query(ctx);
  ctx.success(await grid.fetch(ctx.model.user.find()));
});
