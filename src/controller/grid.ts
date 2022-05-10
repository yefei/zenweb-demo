import { Context, mapping } from "zenweb";
import { Grid } from "@zenweb/grid";
import { fields } from "@zenweb/form";
import * as moment from "moment";

function ageRange(min: number, max: number) {
  return {
    $between: [
      moment().subtract(max, "y").format("YYYY-MM-DD"),
      moment().subtract(min, "y").format("YYYY-MM-DD"),
    ],
  };
}

export class GridController {
  @mapping()
  async grid(ctx: Context, grid: Grid) {
    grid.column("id").label("ID").sortable();
    grid.column("name").label("姓名");
    grid
      .column("birthday")
      .label("生日")
      .formatter((row) =>
        row.birthday ? moment(row.birthday).format("YYYY-MM-DD") : "无"
      );
    grid.column("created_at").label("注册日期").sortable();
    grid
      .filter(
        "age",
        fields.select("年龄段").choices([
          { label: "毛蛋", value: 0 },
          { label: "少年", value: 1 },
          { label: "壮年", value: 2 },
          { label: "中年", value: 3 },
          { label: "老年", value: 4 },
        ])
      )
      .where(
        (value) =>
          [
            { birthday: ageRange(0, 18) },
            { birthday: ageRange(18, 40) },
            { birthday: ageRange(18, 40) },
            { birthday: ageRange(40, 55) },
            { birthday: ageRange(55, 100) },
          ][value]
      );
    grid
      .filter(
        "created_at",
        fields.dateRange("注册日期").end(new Date().toDateString())
      )
      .where((value) => ({ created_at: { $between: value } }));
    grid
      .filter("search", fields.text("关键词搜索").type("trim"))
      .where((value) => ({ name: { $like: `%${value}%` } }));
    grid.filter(
      "cas",
      fields.cascader("级连选择").choices([
        { label: "第一层", value: 1 },
        { label: "第二层", value: 2, parent: 1 },
      ])
    ).where(v => {
      console.log('查询处理');
      return {};
    });
    grid.setOrder("-id");
    ctx.success(await grid.fetch(ctx.model.user.find()));
  }
}
