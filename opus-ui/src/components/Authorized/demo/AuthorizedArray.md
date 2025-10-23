---
tag: components/Authorized
order: 1
title: 使用数组作为参数
---

Use Array as a parameter

```jsx
import React from 'react';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';
import 'antd/dist/antd.css';

const Authorized = RenderAuthorized('user');
const noMatch = <Alert message="No permission." type="error" showIcon />;


export default () => (
  <Authorized authority={['user', 'admin']} noMatch={noMatch}>
    <Alert message="Use Array as a parameter passed!" type="success" showIcon />
  </Authorized>
)
```
