
import request from '@/utils/request';

export async function checkUserIfOwnResources(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/resource/checkUserIfOwnResources', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function filterAuthorityActivityButtons(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/resource/filterAuthorityActivityButtons', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllUserIdByCaseCategoryAndProcActKey(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/resource/findAllUserIdByCaseCategoryAndProcActKey', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findRelativeGroupAndUserInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/resource/findRelativeGroupAndUserInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  checkUserIfOwnResources,
  filterAuthorityActivityButtons,
  findAllUserIdByCaseCategoryAndProcActKey,
  findRelativeGroupAndUserInfo,
}
