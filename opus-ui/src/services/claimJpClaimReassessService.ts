import request from '@/utils/request';

export async function validateReAssess(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/validateReAssess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  validateReAssess,
};
