# ZenWeb 演示项目

## 创建数据库&表
创建数据库后使用 test.sql 文件创建表结构

## 数据库结构更新

编辑 .dbgen.json 文件，修改成您本地数据库配置信息。然后运行命令：
```
yarn dbgen
```

编辑 src/config/db.ts 修改项目数据库配置信息

## 启动开发环境

```
yarn dev
```

## 部署生产环境

可以使用 Jenkins 也可以自己构建 docker 镜像，构建代码参考项目文件
