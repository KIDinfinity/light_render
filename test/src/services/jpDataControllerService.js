import { stringify } from 'qs';
import request from '@/utils/request';

export async function approve(params) {
  return request('/api/cc/jp/data/approve', {
    method: 'POST',
    body: params,
  });
}

export async function findFunctionByTask(params) {
  return request(`/api/cc/jp/data/findFunctionByTask?${stringify(params)}`);
}

export async function getFunctionId(params) {
  return request(`/api/cc/jp/data/getFunctionId?${stringify(params)}`);
}

export async function grantRecordDuplicateValidator(params) {
  return request('/api/cc/jp/data/grantRecordDuplicateValidator', {
    method: 'POST',
    body: params,
  });
}

export async function importExcel(params) {
  return request('/api/cc/jp/data/importExcel', {
    method: 'POST',
    body: params,
  });
}

export async function listJpMenu(params) {
  return request(`/api/cc/jp/data/listJpMenu?${stringify(params)}`);
}

export async function businessData(params) {
  return request('/api/cc/jp/data/query/businessData', {
    method: 'POST',
    body: params,
  });
}

export async function taskData(params) {
  return request('/api/cc/jp/data/query/taskData', {
    method: 'POST',
    body: params,
  });
}

export async function reject(params) {
  return request('/api/cc/jp/data/reject', {
    method: 'POST',
    body: params,
  });
}

export async function save(params) {
  return request('/api/cc/jp/data/save', {
    method: 'POST',
    body: params,
  });
}

export async function submit(params) {
  return request('/api/cc/jp/data/submit', {
    method: 'POST',
    body: params,
  });
}

export async function validate(params) {
  return request('/api/cc/jp/data/validate', {
    method: 'POST',
    body: params,
  });
}

export default {
  approve,
  findFunctionByTask,
  getFunctionId,
  grantRecordDuplicateValidator,
  importExcel,
  listJpMenu,
  businessData,
  taskData,
  reject,
  save,
  submit,
  validate,
};
