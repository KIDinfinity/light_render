import request from '@/utils/request';

export async function listJpDocConfigsByDocTypeCodes(params) {
  return request('/rpc/doc/listJpDocConfigsByDocTypeCodes', {
    method: 'POST',
    body: params,
  });
}

export default {
  listJpDocConfigsByDocTypeCodes,
};
