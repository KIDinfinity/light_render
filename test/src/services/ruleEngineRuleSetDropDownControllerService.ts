
import request from '@/utils/request';

export async function findNumericAtomByModule(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/findNumericAtomByModule', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findRuleSetDropDown(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/findRuleSetDropDown', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findNumericAtomByModule,
  findRuleSetDropDown,
}
