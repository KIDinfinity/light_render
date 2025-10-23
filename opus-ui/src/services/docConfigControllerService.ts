
import request from '@/utils/request';

export async function getDocConfigsByRegionAndDocTypeCodes(params?: any, option?: any): Promise<any> {
  return request('/api/doc/getDocConfigsByRegionAndDocTypeCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listDocConfigsByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/doc/listDocConfigsByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listDocsByGroupCode(params?: any, option?: any): Promise<any> {
  return request('/api/doc/listDocsByGroupCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getDocConfigsByRegionAndDocTypeCodes,
  listDocConfigsByRegion,
  listDocsByGroupCode,
}
