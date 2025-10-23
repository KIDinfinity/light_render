
import request from '@/utils/request';

export async function getProcessInfoByOrgMemberList(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/homepage/getProcessInfoByOrgMemberList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getProcessInfoByOrgMemberList,
}
