import request from '@/utils/request';

export async function findByRegionCodeAndProductCodeList(params?: any, option?: any): Promise<any> {
  return request('/api/pc/plan/planDictProduct/findByRegionCodeAndProductCodeList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProductInfoByContractTypeAndBusinessCode(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/pc/getProductInfoByContractTypeAndBusinessCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findByRegionCodeAndProductCodeList,
  getProductInfoByContractTypeAndBusinessCode,
};
