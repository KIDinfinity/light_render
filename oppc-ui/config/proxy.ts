/**
 * 环境代理地址映射
 */
import { proxyEnvMap, ProxyEnvKey } from '../src/constants/proxyEnv';




/**
 * 生成 Umi 代理配置对象
 */
export type ProxyConfig = {
  [key: string]: {
    target: string;
    changeOrigin: boolean;
    secure: boolean;
    pathRewrite: { [key: string]: string };
    headers: { Referer: string };
  };
};

const proxy: ProxyConfig = Object.keys(proxyEnvMap).reduce((data, item) => {
  const key = `/${item}`;
  data[key] = {
    target: proxyEnvMap[item as ProxyEnvKey],
    changeOrigin: true,
    secure: false,
    pathRewrite: { [key]: '' },
    headers: {
      Referer: proxyEnvMap[item as ProxyEnvKey],
    },
  };
  return data;
}, {} as ProxyConfig);

export default proxy;
