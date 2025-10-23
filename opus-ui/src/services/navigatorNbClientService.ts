import request from '@/utils/request';

export async function execute(params?: any, option?: any): Promise<any> {
  return request('/rpc/nb/ntu/execute', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function testAPI(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/test/testAPI', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  execute,
  testAPI,
};
