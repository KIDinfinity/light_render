
import request from '@/utils/request';

export async function addResultToLibrary(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/addResultToLibrary', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLibraryResult(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/getLibraryResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryInternationalisedLibraryResult(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/queryInternationalisedLibraryResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addResultToLibrary,
  getLibraryResult,
  queryInternationalisedLibraryResult,
}
