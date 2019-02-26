# todo

## 安装依赖

```
yarn install
```

## 启动 mongodb

```
有的windows电脑需要运行 mongod.exe 文件；有的 mac 需要运行 ./mongod。
```

## 启动 todo 项目

- `yarn run db` 启动连接数据库的服务
- `yarn start` 启动开发环境

## 功能分析

- 回车事件添加 todo
- 点击每一行的多选框修改 todo 的状态
- 点击每一行的叉叉删除 todo
- 列表每一行的多选框和输入框旁边的多选框要联动
- 有完成的 todo 时要显示 “删除已完成” 这个功能
- “全部”、“进行中”、“已完成” 可以切换查看的类型，这个可以只对数据进行过滤，不需要经过后台

## 设计思路

- 将 todo 的列表数据存在 vuex 的 store 中
- 增、删、改操作完成之后都要进行一次查，刷新 store
- 是否显示 “第一行的多选框”、“最下面的工具栏”、是否显示 “删除已完成”、“左下角的待办统计”，根据 getter 计算返回
- 封装一下 axios ，给 Vue.prototype 增加一个方法 _ajax(type, url, callback, params)，方便使用异步请求