<h1 align="center">Venus-UI</h1>
#fff
<div align="center">
开箱即用的中台前端/设计解决方案。
</div>

## 特性

- **优雅美观**：基于 Ant Design 体系精心设计
- **常见设计模式**：提炼自中后台应用的典型页面和场景
- **最新技术栈**：使用 React/umi/dva/antd 等前端前沿技术开发
- **响应式**：针对不同屏幕大小设计
- **主题**：可配置的主题满足多样化的品牌诉求
- **国际化**：内建业界通用的国际化方案
- **最佳实践**：良好的工程实践助您持续产出高质量代码
- **Mock 数据**：实用的本地数据调试方案
- **UI 测试**：自动化测试保障前端产品质量


## 模板

```
- Dashboard
  - 分析页
  - 监控页
  - 工作台
- 表单页
  - 基础表单页
  - 分步表单页
  - 高级表单页
- 列表页
  - 查询表格
  - 标准列表
  - 卡片列表
  - 搜索列表（项目/应用/文章）
- 详情页
  - 基础详情页
  - 高级详情页
- 用户
  - 用户中心页
  - 用户设置页
- 结果
  - 成功页
  - 失败页
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
- 帐户
  - 登录
  - 注册
  - 注册成功
```

## 快速开始

### 环境准备

* [homebrew](http://10.22.146.22:8090/display/OPTC/1.02.01.01+Homebrew)
* [oh-my-zsh](http://10.22.146.22:8090/display/OPTC/1.02.01.02+oh-my-zsh)
* [nvm](http://10.22.146.22:8090/display/OPTC/1.02.01.03+nvm)

### 使用命令行
```bash
$ cd Venus-UI
$ nvm install
$ npm run bootstrap
$ npm start         # 访问 http://localhost:8000
```
## 其他命令

> 涉及 scripts/* 下的依赖自行安装 此不赘述

### 打印 eslint 规则
```sh
$ npm run print-eslint-rules
```
### sit 分支打 tag
> 用于代码分支合并时的时间节点记录，便于合并出现问题的时候快速恢复分支代码
```
$ npm run tag-today
```
### 移除 sit 当日的时间节点 tag
```sh
$ npm run remove-tag-tody
```


### 自动更新接口方法

```bash
$ npm run yo-swagger-install # 初次使用安装依赖
$ npm run yo-swagger # 从swagger 更新接口服务
```
> :warning: 注意不能手动 /src/services 下所有方法都不可手动修改 否则跑yo-swagger 改动会被覆盖

## 支持环境

现代浏览器及 IE11。

| <img src="./docusaurus/docs/assets/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /></br> IE / Edge | <img src="./docusaurus/docs/assets/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /></br>Chrome |
| - | - |
| IE11, Edge | last 2 versions |

## 更改主题：npm run start:theme

### 测试没有change会报错
\n
