---
tag: components/Ellipsis
order: 0
title: 按照字符数省略
---

## zh-CN

通过设置 `length` 属性指定文本最长长度，如果超过这个长度会自动截取。

## en-US

`length` attribute specifies the maximum length where the text will automatically be truncated when exceeded.

````jsx
import React from 'react';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

const article = 'There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.';

export default () => (
  <div>
    <Ellipsis length={100}>{article}</Ellipsis>
    <h4 style={{ marginTop: 24 }}>Show Tooltip</h4>
    <Ellipsis length={100} tooltip>{article}</Ellipsis>
  </div>
)
````
