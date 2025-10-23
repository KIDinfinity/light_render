import request from '@/utils/request';

export async function advSearch(params) {
  return request('/api/dw/case/advSearch', {
    method: 'POST',
    body: params,
  });
}

export default {
  advSearch,
};
