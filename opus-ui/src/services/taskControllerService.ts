import request from '@/utils/request';

export async function advSearch(params, option) {
  return request('/api/dw/task/advSearch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function completes(params, option) {
  return request('/api/dw/task/completes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function favorites(params, option) {
  return request('/api/dw/task/favorites', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function priorities(params, option) {
  return request('/api/dw/task/priorities', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  advSearch,
  completes,
  favorites,
  priorities,
};
