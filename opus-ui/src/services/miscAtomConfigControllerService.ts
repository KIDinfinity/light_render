import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryAtomConfigV2(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/atomconfig/queryAtomConfig/v2?${stringify(params)}`, {
    localCache: true,
    ...option,
  });
}

export async function queryAtomConfigUI(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/uiconfig/queryAtomConfig?${stringify(params)}`, {
    localCache: true,
    ...option,
  });
}

export async function findAll(params?: any, option?: any): Promise<any> {
  return request('/api/misc/monitorCenter/section/findAll', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryAtomConfigV2,
  queryAtomConfigUI,
  findAll,
};
