
import request from '@/utils/request';

export async function addRuleToLibrary(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/addRuleToLibrary', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLibraryRule(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/getLibraryRule', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryInternationalisedLibraryRule(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/queryInternationalisedLibraryRule', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryLibrarys(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/queryLibrarys', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addRuleToLibrary,
  getLibraryRule,
  queryInternationalisedLibraryRule,
  queryLibrarys,
}
