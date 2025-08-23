
import request from '@/utils/request';

export async function addBranchToLibrary(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/addBranchToLibrary', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLibraryBranch(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/getLibraryBranch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryInternationalisedLibraryBranch(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/queryInternationalisedLibraryBranch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addBranchToLibrary,
  getLibraryBranch,
  queryInternationalisedLibraryBranch,
}
