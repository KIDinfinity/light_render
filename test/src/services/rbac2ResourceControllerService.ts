
import request from '@/utils/request';

export async function checkUserIfOwnResource(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/checkUserIfOwnResource', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkUserIfOwnResources(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/checkUserIfOwnResources', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findActivityByRoles(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/findActivityByRoles', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByRoles(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/findByRoles', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLimitsByRoles(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/findLimitsByRoles', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findMaskByRoles(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/findMaskByRoles', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listCaseCategoryByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/listCaseCategoryByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listPermissionMenu(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/listPermissionMenu', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  checkUserIfOwnResource,
  checkUserIfOwnResources,
  findActivityByRoles,
  findByRoles,
  findLimitsByRoles,
  findMaskByRoles,
  listCaseCategoryByUserId,
  listPermissionMenu,
}
