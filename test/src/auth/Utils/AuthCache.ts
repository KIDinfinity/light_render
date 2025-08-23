import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';
import type { AuthProps } from '../Typings';
import getCategoryCode from './getCategoryCode';

class AuthCache {
  getCache = () => LS.getItem(LSKey.AUTHORITYCONTRL, false);

  setCache = (authority: any) => LS.setItem(LSKey.AUTHORITYCONTRL, authority);

  removeCache = () => LS.removeItem(LSKey.AUTHORITYCONTRL);

  // 获取缓存Auth Map
  getAuthMap = () => {
    return this.getCache() || {};
  };

  // 获取Auth (taskId, 或存在特定的categoryCode)
  // 缓存都有这些CategoryCode, 返回缓存，否则调接口
  getAuth = (CacheKey: string, CateogryList?: string[]) => {
    const AuthStorage = this.getAuthMap();
    const CacheAuth = lodash.get(AuthStorage, CacheKey);
    if (lodash.isEmpty(CateogryList)) {
      return CacheAuth;
    }
    return this.checkCategoryExit(CacheAuth, CateogryList) ? CacheAuth : false;
  };

  // 设置Auth
  // 存在缓存，合并并过滤重复
  setAuth = (taskId: string, authority: AuthProps[]) => {
    const authorityMap = this.getAuthMap();
    const CacheAuth = this.getAuth(taskId);
    let authorityList = authority;
    if (CacheAuth) {
      authorityList = lodash.unionBy(lodash.concat(authority, CacheAuth), 'categoryCode');
    }
    return this.setCache({
      ...authorityMap,
      [taskId]: authorityList,
    });
  };

  // 检查缓存是否categoryCode都存在
  checkCategoryExit = (CacheAuth: AuthProps[], CateogryList: string[] = []) => {
    const CacheCategory = getCategoryCode(CacheAuth);
    return lodash.every(CateogryList, (item: string) => lodash.includes(CacheCategory, item));
  };

  // 清除权限缓存
  clear = (CacheKey?: string) => {
    if (!CacheKey) return;
    const authorityMap = this.getAuthMap();
    this.setCache({
      ...authorityMap,
      [CacheKey]: [],
    });
  };
}

export default new AuthCache();
