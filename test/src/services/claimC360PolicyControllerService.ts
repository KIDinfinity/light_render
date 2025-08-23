import request from '@/utils/request';

export async function inquiryByInsured(params?: any, option?: any): Promise<any> {
  return request('/api/claim/c360/policy/hk/inquiryByInsured', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function reloadInsureInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/c360/policy/th/reloadInsureInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export default {
  inquiryByInsured,
  reloadInsureInfo,
};
