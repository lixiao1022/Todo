# todo

## 登录

```
管理员的手机号和密码
```

- 手机号：admin，密码：admin

## 安装依赖

```
yarn install
```

## 启动 mongodb

```
有的windows电脑需要运行 mongod.exe 文件；有的 mac 需要运行 ./mongod。
```

## 启动 todo 项目

- `yarn start` 启动打包之后的 todo 项目，首页通过端口 8002 进入
- `yarn run server` 启动开发环境（8080）

## 功能分析

- 待办
    - 回车事件添加 todo
    - 点击每一行的多选框修改 todo 的状态
    - 点击每一行的叉叉删除 todo
    - 列表每一行的多选框和输入框旁边的多选框要联动
    - 有完成的 todo 时要显示 “删除已完成” 这个功能
    - “全部”、“进行中”、“已完成” 可以切换查看的类型，这个可以只对数据进行过滤，不需要经过后台
- 登录
    - 将用户在数据库中的 _id 保存在 vuex 中
    - vuex 的数据在刷新之后就会重置，所以用 sessionStorage 保存用户的登录状态：项目初始化时获取 sessionStorage 中的信息，登录成功之后再获取一遍
    把每条 todo 都加上当前用户的 _id
    - 用路由守卫在进入每个页面前判断 sessionStorage 有没有登录信息，登录之后不能再去 login 页面
    - 退出登录，就清除 sessionStorage 并将导航设置为 login 页面
- 用户管理
    - 只有管理员能够进入用户管理界面
    - 数据库中存入用户能访问页面的路由，前端将这个值保存在vuex中，然后在user页面判断是否有权限进入


## 设计思路

- 将 todo 的列表数据存在 vuex 的 store 中
- 增、删、改操作完成之后都要进行一次查，刷新 store
- 是否显示 “第一行的多选框”、“最下面的工具栏”、是否显示 “删除已完成”、“左下角的待办统计”，根据 getter 计算返回
- 封装一下 axios ，给 Vue.prototype 增加一个方法 _ajax(type, url, callback, params)，方便使用异步请求