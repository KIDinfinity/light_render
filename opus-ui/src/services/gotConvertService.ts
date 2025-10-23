import request from '@/utils/request';

export async function businessDataBEToFE(params?: any, option?: any): Promise<any> {
  return request('/api/got/convert/businessDataBEToFE', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function businessDataFEToBE(params?: any, option?: any): Promise<any> {
  return request('/api/got/convert/businessDataFEToBE', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function clientBEToFE(params?: any, option?: any): Promise<any> {
  return request('/api/got/convert/clientBEToFE', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function clientFEToBE(params?: any, option?: any): Promise<any> {
  return request('/api/got/convert/clientFEToBE', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function clientFEToBETest(params?: any, option?: any): Promise<any> {
  return request('/api/got/convert/clientFEToBETest', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  clientBEToFE,
  clientFEToBETest,
  businessDataBEToFE,
  businessDataFEToBE
};
