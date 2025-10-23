
import { stringify } from 'qs';
import request from '@/utils/request';

export async function createDatasoure(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/admin.registration/registration/createDatasoure', {
    ...option,
    method: 'PUT',
    body: params,
  });
}

export async function deleteBusinessSystem(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/admin.registration/registration/deleteBusinessSystem', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteDatasource(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/admin.registration/registration/deleteDatasource', {
    ...option,
    method: 'DELETE',
    body: params,
  });
}

export async function listBusinessSystem(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/admin.registration/registration/listBusinessSystem', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listDatasoure(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/admin.registration/registration/listDatasoure', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listMetadataByDatasource(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/business/admin.registration/registration/listMetadataByDatasource?${stringify(params)}`, {
    ...option,
  });
}

export async function listTable(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/business/admin.registration/registration/listTable?${stringify(params)}`, {
    ...option,
  });
}

export async function registerBusinessSystem(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/admin.registration/registration/registerBusinessSystem', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateBusinessSystem(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/admin.registration/registration/updateBusinessSystem', {
    ...option,
    method: 'PUT',
    body: params,
  });
}

export async function updateDatasoure(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/admin.registration/registration/updateDatasoure', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  createDatasoure,
  deleteBusinessSystem,
  deleteDatasource,
  listBusinessSystem,
  listDatasoure,
  listMetadataByDatasource,
  listTable,
  registerBusinessSystem,
  updateBusinessSystem,
  updateDatasoure,
}
