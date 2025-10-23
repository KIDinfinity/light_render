
import request from '@/utils/request';

export async function miscCommonHierarchyLinkCommon(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/miscCommonHierarchyLinkCommon', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  miscCommonHierarchyLinkCommon,
}
