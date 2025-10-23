
import request from '@/utils/request';

export async function forceInitCCSystem(params?: any, option?: any): Promise<any> {
  return request('/api/cc/init/forceInitCCSystem', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initCCSystem(params?: any, option?: any): Promise<any> {
  return request('/api/cc/init/initCCSystem', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initJpData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/init/initJpData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initNewCCSystem(params?: any, option?: any): Promise<any> {
  return request('/api/cc/init/initNewCCSystem', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  forceInitCCSystem,
  initCCSystem,
  initJpData,
  initNewCCSystem,
}
