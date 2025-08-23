---
tag: components/Authorized
order: 3
title: 注解基本使用
---

secured demo used

```jsx
import React from 'react';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { Alert } from 'antd';

const { Secured } = RenderAuthorized('user');

@Secured('admin')
class TestSecuredString extends React.Component {
  render() {
    <Alert message="user Passed!" type="success" showIcon />;
  }
}
export default () => (
  <div>
    <TestSecuredString />
  </div>
)
```

