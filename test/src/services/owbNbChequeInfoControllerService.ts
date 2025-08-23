import request from '@/utils/request';

export async function edit(params?: any, option?: any): Promise<any> {
  return request('/api/nb/chequeInfo/edit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refresh(params?: any, option?: any): Promise<any> {
  return request('/api/nb/chequeInfo/refresh', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/api/nb/chequeInfo/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function verify(params?: any, option?: any): Promise<any> {
  return request('/api/nb/chequeInfo/verify', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function editCancel(params?: any, option?: any): Promise<any> {
  return request('/api/nb/chequeInfo/editCancel', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function get(params?: any, option?: any): Promise<any> {
  return request('/api/nb/chequeInfo/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  edit,
  refresh,
  save,
  verify,
  editCancel,
  get,
};
