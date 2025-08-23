import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryPageAtomConfig(params?: any, option?: any): Promise<any> {
  return request('/api/misc/pageatomconfig/queryPageAtomConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryPageAtomConfigV2(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/pageatomconfig/queryPageAtomConfig/v2?${stringify(params)}`, {
    ...option,
  });
}

export async function queryPageAtomConfigUI(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/uiconfig/queryPageAtomConfig?${stringify(params)}`, {
    ...option,
  });
}

export async function findPageAtomConfigByInformationType(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/misc/pageatomconfig/findPageAtomConfigByInformationType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryPageAtomConfig,
  queryPageAtomConfigV2,
  queryPageAtomConfigUI,
  findPageAtomConfigByInformationType,
};
