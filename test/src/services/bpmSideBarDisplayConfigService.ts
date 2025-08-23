import request from '@/utils/request';

export async function listDisplayConfig(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/listDisplayConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listAutoExpandConfig(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/listAutoExpandConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listDisplayConfig,
  listAutoExpandConfig,
};
