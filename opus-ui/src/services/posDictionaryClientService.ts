import request from '@/utils/request';

export async function getDictCodeByNameAndType(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/getDictCodeByNameAndType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByTypeCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/queryByTypeCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getEwiUrl(params?: any, option?: any): Promise<any> {
  return request('/api/misc/url/getEwiUrl', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getDictCodeByNameAndType,
  queryByTypeCode,
  getEwiUrl,
};
