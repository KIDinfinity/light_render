import React from 'react';

const context = React.createContext({
  isHideRequireIcon: false, // 忽略必填校验
  isDecorator: true, // 是否注册输入框
} as any);

export default context;
