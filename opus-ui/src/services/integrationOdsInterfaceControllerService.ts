
import request from '@/utils/request';

export async function getHosBillPaymentInfo(params?: any, option?: any): Promise<any> {
  return request('/api/integration/ods/getHosBillPaymentInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getMockHosBillPaymentInfo(params?: any, option?: any): Promise<any> {
  return request('/api/integration/ods/getMockHosBillPaymentInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getHosBillPaymentInfo,
  getMockHosBillPaymentInfo,
}
