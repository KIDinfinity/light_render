
import request from '@/utils/request';

export async function advancedQuery(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/advancedQuery', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function ruleSetQuery(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/ruleSetQuery', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  advancedQuery,
  ruleSetQuery,
}
