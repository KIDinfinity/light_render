import React from 'react';
import { CURRENT } from './RenderAuthorize';
import PromiseRender from './PromiseRender';

export type IAuthorityType =
  | undefined
  | string
  | string[]
  | Promise<boolean>
  | ((currentAuthority: string | string[]) => IAuthorityType);

const checkPermissions = <T, K>(
  authority: IAuthorityType,
  currentAuthority: string | string[],
  target: T,
  Exception: K
): T | K | React.ReactNode => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;

  // 如果是登陆页面，返回空(升级dva版本后登陆页也进来了鉴权页面，所以加了这个判断，暂未找到原因)
  if (window.location.href.indexOf('/user/login') > 0) return null;

  if (!authority) {
    return target;
  }

  if (window.location.href.indexOf('/user/login') > 0) return null;

  // 数组处理
  if (Array.isArray(authority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority.includes(item))) {
        return target;
      }
    } else if (authority.includes(currentAuthority)) {
      return target;
    }
    return Exception;
  }
  // string 处理
  if (typeof authority === 'string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority === item)) {
        return target;
      }
    } else if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }
  // Promise 处理
  if (authority instanceof Promise) {
    return <PromiseRender<T, K> ok={target} error={Exception} promise={authority} />;
  }
  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority);
      // 函数执行后返回值是 Promise
      if (bool instanceof Promise) {
        return <PromiseRender<T, K> ok={target} error={Exception} promise={bool} />;
      }
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

export { checkPermissions };

function check<T, K>(authority: IAuthorityType, target: T, Exception: K): T | K | React.ReactNode {
  return checkPermissions<T, K>(authority, CURRENT, target, Exception);
}

export default check;
