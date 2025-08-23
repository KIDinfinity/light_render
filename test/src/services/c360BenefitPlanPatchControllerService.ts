import request from '@/utils/request';

export async function patchForAllRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/c360/plan/patch/patchForAllRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function patchWithRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/c360/plan/patch/patchWithRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getFecInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/fec/getFecInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  patchForAllRegionCode,
  patchWithRegionCode,
  getFecInfo,
};
