import request from '@/utils/request';

export async function getClaimHistory(params, option) {
  return request('/api/dw/claim/query/history', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimHistory,
};
