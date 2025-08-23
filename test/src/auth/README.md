### 用户角色
> *  route  ['admin','user']  
  login
> *  smartcirle  ['smartcirle']  => create case
  login > rbac.checkSourceOwn

### 结构
 * `_model` redux
 * `Authorized`  业务配置组件
 * `Components` 基础组件
 * `Constant` 常量
 * `Layout` 路由入口
 * `Typings` 定义声明
 * `Utils` 工具类

### 改动点

> `表单单击`， 检查view权限，侧边栏权限
  * home => handerRecordChange
> `路由跳转`， 获取view权限
  * model => global.js  => visitDetail
> `assign`,  检查有没有转移任务权限
  * assignSelf / assignOthers / beAssign
  * navigator => messager => ContactsAssignListItem => drop 松手
> `infomation` 检查备注管理  
  * handerRecordChange 阻断， 
  * 挂载阻断， 
  * loadHistory阻断
> `envoy ` 检查通知管理
  * handerRecordChange阻断
  * CaseSelect选择后阻断， 
  * PendList加载阻断
> `AuthLayout` 
  * taskDetail外层权限
