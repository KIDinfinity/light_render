import { LSKey } from '@/utils/cache';
import { Env } from '@/components/Tenant';
import { stringify } from 'qs';

declare const NODE_ENV: any;

export default ({ url, option }: { url: string; option: any }) => {
  const urlStr = option?.query ? `${url}?${stringify(option.query)}` : url;
  const currentNodeEnv = typeof NODE_ENV !== 'undefined' ? NODE_ENV : null;
  let proxy = localStorage.getItem(LSKey.PROXY);

  if (currentNodeEnv === Env.Development) {
    if (!proxy) {
      proxy = Env.PreSit;
      localStorage.setItem(LSKey.PROXY, proxy);
    }
    return `/${proxy}${urlStr}`;
  }
  if (proxy) {
    return `/${proxy}${urlStr}`;
  }
  return urlStr;
};
