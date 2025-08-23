---
tag: components/GlobalFooter
order: 0
title: 演示
---

基本页脚。

````jsx
import React from 'react';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { Icon } from 'antd';

const links = function() {
  return [{
    key: '帮助',
    title: '帮助',
    href: '',
  }, {
    key: 'github',
    title: 'github',
    href: 'https://github.com/ant-design/ant-design-pro',
    blankTarget: true,
  }, {
    key: '条款',
    title: '条款',
    href: '',
    blankTarget: true,
  }];
}

const copyright = function() {
  return <div>Copyright 2017 蚂蚁金服体验技术部出品</div>;
}

export default () => (
  <div style={{ background: '#f5f5f5', overflow: 'hidden' }}>
    <div style={{ height: 280 }} />
    <GlobalFooter links={links()} copyright={copyright()} />
  </div>
)
````
