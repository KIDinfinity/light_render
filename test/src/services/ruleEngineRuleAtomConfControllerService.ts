
import request from '@/utils/request';

export async function findAllComparisonOperator(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/findAllComparisonOperator', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAtomInputInfo(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/getAtomInputInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAtomUsageList(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/getAtomUsageList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findAllComparisonOperator,
  getAtomInputInfo,
  getAtomUsageList,
}
