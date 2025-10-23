import request from '@/utils/request';

export async function advSearch(params) {
  return request('/api/dw/task/advSearch', {
    method: 'POST',
    body: params,
  });
}

export async function completes(params) {
  return request('/api/dw/task/completes', {
    method: 'POST',
    body: params,
  });
}

export async function favorites(params) {
  return request('/api/dw/task/favorites', {
    method: 'POST',
    body: params,
  });
}

export async function priorities(params) {
  return request('/api/dw/task/priorities', {
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
