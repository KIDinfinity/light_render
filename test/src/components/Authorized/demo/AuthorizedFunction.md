---
tag: components/Authorized
order: 2
title: 使用方法作为参数
---

Use Function as a parameter

```jsx
import React from 'react';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const Authorized = RenderAuthorized('user');
const noMatch = <Alert message="No permission." type="error" showIcon />;

const havePermission = () => {
  return false;
};

export default () => (
  <Authorized authority={havePermission} noMatch={noMatch}>
    <Alert
      message="Use Function as a parameter passed!"
      type="success"
      showIcon
    />
  </Authorized>
)
```
