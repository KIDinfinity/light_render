import request from '@/utils/request';

export async function miscCommonHierarchyLinkCommonMultiple(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/misc/dropdown/miscCommonHierarchyLinkCommonMultiple', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  miscCommonHierarchyLinkCommonMultiple,
};
