
import { stringify } from 'qs';
import request from '@/utils/request';

export async function approve(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/approve', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findDuplicateData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/findDuplicateData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findFunctionByTask(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/jp/data/findFunctionByTask?${stringify(params)}`, {
    ...option,
  });
}

export async function getFunctionId(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/jp/data/getFunctionId?${stringify(params)}`, {
    ...option,
  });
}

export async function grantRecordDuplicateValidator(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/grantRecordDuplicateValidator', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function importExcel(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/importExcel', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function jpFindFunction(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/jp/data/jpFindFunction?${stringify(params)}`, {
    ...option,
  });
}

export async function listJpMenu(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/jp/data/listJpMenu?${stringify(params)}`, {
    ...option,
  });
}

export async function businessData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/query/businessData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function taskData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/query/taskData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reject(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/reject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validate(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/validate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  approve,
  findDuplicateData,
  findFunctionByTask,
  getFunctionId,
  grantRecordDuplicateValidator,
  importExcel,
  jpFindFunction,
  listJpMenu,
  businessData,
  taskData,
  reject,
  save,
  submit,
  validate,
}
