---
tag: components/PageHeader
order: 3
title: Simple
---

简单的页头。

````jsx
import React from 'react';
import PageHeader from 'ant-design-pro/lib/PageHeader';

const breadcrumbList = [{
  title: '一级菜单',
  href: '/',
}, {
  title: '二级菜单',
  href: '/',
}, {
  title: '三级菜单',
}];

export default () => (
  <div>
    <PageHeader title="页面标题" breadcrumbList={breadcrumbList} />
  </div>
)
````

<style>
#scaffold-src-components-PageHeader-demo-simple .code-box-demo {
  background: #f2f4f5;
}
</style>
