import request from '@/utils/request';

export async function findActionUserInfoList(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/caseOperationInfo/findActionUserInfoList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findActionUserInfoList,
};
