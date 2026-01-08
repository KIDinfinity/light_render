// 运行时配置

import { getBaseURL } from './utils/proxy';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

// 请求配置
export const request = {
  requestInterceptors: [
    (url: string, options: any) => {
      if (process.env.NODE_ENV === 'development') {
        const baseURL = getBaseURL();
        return {
          url: `${baseURL}${url}`,
          options,
        };
      }
      return { url, options };
    },
  ],
};
