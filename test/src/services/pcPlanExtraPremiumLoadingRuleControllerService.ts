import request from '@/utils/request';

export async function findByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/pc/planExtraPremiumLoadingRule/v2/findByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findByRegionCode,
};
