import request from '@/utils/request';

export async function findAuthActivityByRoleCodes(params) {
  return request('/api/rbac2/resource/findAuthActivityByRoleCodes', {
    method: 'POST',
    body: params,
  });
}

export async function findUserProcessByRoleId(params) {
  return request('/api/rbac2/resource/findUserProcessByRoleId', {
    method: 'POST',
    body: params,
  });
}

export default {
  findAuthActivityByRoleCodes,
  findUserProcessByRoleId,
};
