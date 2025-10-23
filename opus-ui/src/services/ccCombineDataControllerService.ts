
import request from '@/utils/request';

export async function findDuplicateDataCombine(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/findDuplicateDataCombine', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function allGroupInfo(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/allGroupInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function allPermission(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/allPermission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function allRoleInfo(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/allRoleInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function combineDataDtl(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/combineDataDtl', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function combinePermission(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/combinePermission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function combineUser(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/combineUser', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function combineUserGroup(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/combineUserGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findSelfModifyingTask(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/findSelfModifyingTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryRoleOfPermission(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/queryRoleOfPermission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryUserGroupByRole(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/queryUserGroupByRole', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryUserGroupOfRole(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/queryUserGroupOfRole', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function treeAllOrganization(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/treeAllOrganization', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function allMentor(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/combine/query/allMentor', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findDuplicateDataCombine,
  allGroupInfo,
  allPermission,
  allRoleInfo,
  combineDataDtl,
  combinePermission,
  combineUser,
  combineUserGroup,
  findSelfModifyingTask,
  queryRoleOfPermission,
  queryUserGroupByRole,
  queryUserGroupOfRole,
  treeAllOrganization,
  save,
  submit,
  allMentor,
}
