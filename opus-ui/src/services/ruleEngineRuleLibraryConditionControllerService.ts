
import request from '@/utils/request';

export async function addConditionToLibrary(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/addConditionToLibrary', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLibraryCondition(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/getLibraryCondition', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryInternationalisedLibraryCondition(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/queryInternationalisedLibraryCondition', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addConditionToLibrary,
  getLibraryCondition,
  queryInternationalisedLibraryCondition,
}
