
import request from '@/utils/request';

export async function getInsuredByFirstNameList(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/insure/getInsuredByFirstNameList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyInsuredList(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/insure/getPolicyInsuredList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/insure/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getInsuredByFirstNameList,
  getPolicyInsuredList,
  save,
}
