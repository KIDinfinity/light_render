import request from '@/utils/request';

export async function updateNonOpusInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/updateNonOpusInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  updateNonOpusInfo,
};
