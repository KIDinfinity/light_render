import request from '@/utils/request';

export async function advancedQueryRich(params, option) {
  return request('/api/navigator/user/advancedQueryRich', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function advSearch(params, option) {
  return request('/api/dw/usr/advSearch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  advancedQueryRich,
  advSearch,
};
