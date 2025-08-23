import request from '@/utils/request';

export async function queryByPage(params) {
  return request('/rpc/dc/mongodb/queryByPage', {
    method: 'POST',
    body: params,
  });
}

export default {
  queryByPage,
};
