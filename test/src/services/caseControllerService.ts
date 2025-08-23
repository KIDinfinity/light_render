import request from '@/utils/request';

export async function advSearch(params, option) {
  return request('/api/dw/case/advSearch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  advSearch,
};
