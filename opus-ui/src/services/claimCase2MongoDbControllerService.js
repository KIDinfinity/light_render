import request from '@/utils/request';

export async function add(params) {
  return request('/api/claim/assessment/th/claim2mongodb/add', {
    method: 'POST',
    body: params,
  });
}

export default {
  add,
};
