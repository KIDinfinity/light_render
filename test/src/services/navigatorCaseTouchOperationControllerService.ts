import request from '@/utils/request';

export async function getTouchResult(
  params?: any,
  option?: any,
  async: boolean = true
): Promise<any> {
  return request(
    '/api/navigator/cases/getTouchResult',
    {
      ...option,
      method: 'POST',
      body: params,
    },
    async
  );
}

export async function revertTouchResult(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/cases/revertTouchResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function touch(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/cases/touch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getTouchResult,
  revertTouchResult,
  touch,
};
