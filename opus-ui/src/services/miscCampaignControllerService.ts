import request from '@/utils/request';

export async function searchByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/campaign/searchByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  searchByRegionCode,
};
