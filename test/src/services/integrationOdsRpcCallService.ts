
import request from '@/utils/request';

export async function getInsuredInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/ods/ods/getInsuredInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function setOdsMockData(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/ods/ods/setOdsMockData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getInsuredInfo,
  setOdsMockData,
}
