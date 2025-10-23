
import request from '@/utils/request';

export async function evictAll(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/commonAuthority/evictAll', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function evictCommonAuthorityByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/commonAuthority/evictCommonAuthorityByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCommonAuthorityByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/commonAuthority/getCommonAuthorityByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  evictAll,
  evictCommonAuthorityByUserId,
  getCommonAuthorityByUserId,
}
