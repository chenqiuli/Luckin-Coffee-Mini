### 该项目使用的[vantUI文档](https://vant-contrib.gitee.io/vant-weapp)

### 接口文档：物语咖啡店API接口文档.md

### UI图：

### 登录： 13417129000 121212

### 在一个页面修改完信息回去上个页面，页面信息没有刷新，onLoad只会执行一次，onShow又不执行，此时可以在这个页面修改完信息后：获取上一个页面去调用函数

```js
// 在当前页面获取上一个页面，然后调用上一个页面的更新函数去刷新页面
let pages = getCurrentPages();
let prePages = pages[pages.length - 2]; //获取上一个页面的对象
prePages.fetchInfo(); //调用上一个页面里的更新函数
```