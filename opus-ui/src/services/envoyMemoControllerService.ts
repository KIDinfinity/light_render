import { stringify } from 'qs';
import request from '@/utils/request';

export async function findByReasonCodeAndStatus(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/memo/findByReasonCodeAndStatus`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getMemoSubTypeList(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/memo/getMemoSubTypeList`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getMemoSubTypeListV2(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/memo/getMemoSubTypeListV2`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listDefaultMemo(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/memo/listDefaultMemo`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listMemoByCaseCategoryAndActivityKey(
  params?: any,
  option?: any
): Promise<any> {
  return request(`/api/evy/memo/listMemoByCaseCategoryAndActivityKey`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listMemos(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/memo/listMemos?${stringify(params)}`, {
    localCache: true,
    ...option,
  });
}

export async function listRequestClientInfo(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/memo/listRequestClientInfo`, {
    localCache: {
      timeout: 30 * 1000,
    },
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findByReasonCodeAndStatus,
  getMemoSubTypeList,
  getMemoSubTypeListV2,
  listDefaultMemo,
  listMemoByCaseCategoryAndActivityKey,
  listMemos,
  listRequestClientInfo,
};
