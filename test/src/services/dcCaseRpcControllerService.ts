
import request from '@/utils/request';

export async function advSearch(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/case/advSearch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllProces(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/case/findAllProces', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findRelativeCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/case/findRelativeCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getActHiTaskInstInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/case/getActHiTaskInstInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/case/getPolicyByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  advSearch,
  findAllProces,
  findRelativeCase,
  getActHiTaskInstInfo,
  getPolicyByCaseNo,
}
