# Proxy 动态切换与 baseURL 说明

## 1. 需求背景
在开发环境下，前端页面右上角有 ProxySwitcher 下拉菜单，可切换不同的 proxy 环境。切换后，选中的 proxy key 会被保存到 localStorage。前端请求应根据 localStorage 中的 proxy key 动态切换 baseURL。

## 2. 关键配置
- 统一 proxy 环境配置：`src/constants/proxyEnv.ts`
- ProxySwitcher 组件：负责切换和持久化 proxy key
- localStorage key：`proxyEnvKey`

## 3. 动态获取 baseURL 的推荐做法

### 3.1 获取当前 proxy key
```ts
const PROXY_ENV_KEY = 'proxyEnvKey';
const getCurrentProxyKey = () => localStorage.getItem(PROXY_ENV_KEY) as keyof typeof proxyEnvMap || 'mock';
```

### 3.2 获取当前 baseURL
```ts
import { proxyEnvMap } from '@/constants/proxyEnv';

const getBaseURL = () => {
  const key = getCurrentProxyKey();
  return proxyEnvMap[key] || proxyEnvMap.mock;
};
```

### 3.3 在请求工具中动态设置 baseURL
以 axios 为例：
```ts
import axios from 'axios';
import { getBaseURL } from '@/utils/proxy'; // 见下文

const instance = axios.create({
  baseURL: getBaseURL(),
  // ...其他配置
});

// 可选：在每次请求前动态更新 baseURL
instance.interceptors.request.use(config => {
  config.baseURL = getBaseURL();
  return config;
});
```

### 3.4 推荐将 getBaseURL 封装到 utils/proxy.ts
```ts
// src/utils/proxy.ts
import { proxyEnvMap } from '@/constants/proxyEnv';

const PROXY_ENV_KEY = 'proxyEnvKey';
export const getCurrentProxyKey = () => localStorage.getItem(PROXY_ENV_KEY) as keyof typeof proxyEnvMap || 'mock';
export const getBaseURL = () => proxyEnvMap[getCurrentProxyKey()] || proxyEnvMap.mock;
```

## 4. 注意事项
- 仅在开发环境下生效，生产环境建议固定 baseURL。
- 切换 proxy 后，建议刷新页面或重置请求实例。
- 若用 umi-request、fetch 等，原理同理，动态读取 baseURL 即可。

## 5. 参考
- src/constants/proxyEnv.ts
- src/components/ProxySwitcher.tsx
- src/utils/proxy.ts（如未创建可新建）
