---
tag: packages/Basic/components
order: 2
title: 自动化测试标志
group:
    title: Basic
nav:
    title: packages
---

# 自动化测试标志

## 背景
由于自动化测试是基于对 dom 节点，进行操作，所以写自动化脚本的同学会去写脚本找到对应的dom，但现状是

* 测试和前端之间是没有约定当前的dom 节点的唯一标识的
* 前端的dom渲染出来一般是没有id属性的，所以测试同学只能更具classname 属性，以及层级上下文去找出目标的dom节点进行操作
  
> 结果就是可能就是前端可能随手改了一下样式，那自动化测试的同学可能就需要修改自动化的脚本

## 结论
* 自动化测试脚本不应该受样式收样式变动影响

## 解决方案

> 前端和自动化测试同学约定两个自定义的tag, 分别为 `data-test-control-type` 和 `data-test-control-tag`,
前端同学可以根据测试同学需要添加这两个tag, 帮助测试同学自动化过程中对dom的捕获, 降低自动化脚本的维护成本。

>`data-test-control-type` 用于批量获取同一类的dom元素
`data-test-control-tag` 用于唯一确定某个dom
********
## 示例

```js
  import TestFlag from 'basic/components/TestFlag';
  const Button = ({ title, ...others }) => (
    return (
      <button title={title} {...others}/>
    )
  )
  export default TestFlag(({ porps }) => ({
    type: 'button',
    tag: props.buttonName,
  }))(Button)
```

> 借助以上高阶函数，可以将注入 `data-test-control-type` 和 `data-test-control-tag` 的代码抽象出来，避免对组件内部逻辑的入侵。
