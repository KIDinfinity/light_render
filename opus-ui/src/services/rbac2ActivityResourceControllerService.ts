
import request from '@/utils/request';

export async function findAllActivityAuthority(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/findAllActivityAuthority', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAuthActivityByRoleCodes(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/findAuthActivityByRoleCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAuthActivityByRoleCodesV2(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/findAuthActivityByRoleCodesV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findUserProcessByRoleId(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/resource/findUserProcessByRoleId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findAllActivityAuthority,
  findAuthActivityByRoleCodes,
  findAuthActivityByRoleCodesV2,
  findUserProcessByRoleId,
}
