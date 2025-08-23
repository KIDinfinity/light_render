---
tag: components/Authorized
order: 0
title: 基本使用
---

Basic use

```jsx
import React from 'react';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const Authorized = RenderAuthorized('user');
const noMatch = <Alert message="No permission." type="error" showIcon />;

export default () => (
  <div>
    <Authorized authority="admin" noMatch={noMatch}>
      <Alert message="user Passed!" type="success" showIcon />
    </Authorized>
  </div>
)
```
