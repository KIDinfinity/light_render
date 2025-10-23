import request from '@/utils/request';

export async function listAllMiscCommonHierarchyByRegion(option?: any): Promise<any> {
  return request('/api/pc/plan/miscCommonHierarchy/listAllByRegion', {
    ...option,
    method: 'GET',
  });
}

export async function listMiscCommonHierarchy(params?: any, option?: any): Promise<any> {
  return request('/api/pc/plan/miscCommonHierarchy/listByProductAndOccupation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listAllMiscCommonHierarchyByRegion,
  listMiscCommonHierarchy,
};
