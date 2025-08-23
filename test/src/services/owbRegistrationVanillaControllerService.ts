import request from '@/utils/request';

export async function create(params?: any, option?: any): Promise<any> {
  return request('/api/registration/vanilla/case/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/registration/vanilla/case/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getVanillaCaseInfo(params?: any, option?: any): Promise<any> {
  return request('/api/registration/vanilla/inquiry/getVanillaCaseInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getVanillaCaseInfoByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/api/registration/vanilla/inquiry/getVanillaCaseInfoByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateFecDetail(params?: any, option?: any): Promise<any> {
  return request('/api/registration/fecSubCase/updateFecDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  create,
  submit,
  getVanillaCaseInfo,
  getVanillaCaseInfoByBusinessNo,
  updateFecDetail,
};
