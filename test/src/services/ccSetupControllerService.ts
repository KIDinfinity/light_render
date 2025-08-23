
import { stringify } from 'qs';
import request from '@/utils/request';

export async function addSearchComponent(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/addSearchComponent', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function autoRegisterValidator(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/autoRegisterValidator', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batchGenerateDataField(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/batchGenerateDataField', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function createFunction(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/createFunction', {
    ...option,
    method: 'PUT',
    body: params,
  });
}

export async function deleteDataField(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/deleteDataField', {
    ...option,
    method: 'PUT',
    body: params,
  });
}

export async function deleteFunction(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/deleteFunction', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteMetadata(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/deleteMetadata', {
    ...option,
    method: 'DELETE',
    body: params,
  });
}

export async function deleteSearchComponent(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/deleteSearchComponent', {
    ...option,
    method: 'DELETE',
    body: params,
  });
}

export async function listDataField(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/setup/listDataField?${stringify(params)}`, {
    ...option,
  });
}

export async function listFunctionByMetadataId(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/setup/listFunctionByMetadataId?${stringify(params)}`, {
    ...option,
  });
}

export async function listSearchComponent(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/setup/listSearchComponent?${stringify(params)}`, {
    ...option,
  });
}

export async function oneTouchAccess(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/oneTouchAccess', {
    ...option,
    method: 'PUT',
    body: params,
  });
}

export async function queryGangedDropdownByFunction(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/queryGangedDropdownByFunction', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryGangedDropdownByMasterField(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/queryGangedDropdownByMasterField', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateDataField(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/updateDataField', {
    ...option,
    method: 'PUT',
    body: params,
  });
}

export async function updateSearchComponent(params?: any, option?: any): Promise<any> {
  return request('/api/cc/setup/updateSearchComponent', {
    ...option,
    method: 'PUT',
    body: params,
  });
}

export default {
  addSearchComponent,
  autoRegisterValidator,
  batchGenerateDataField,
  createFunction,
  deleteDataField,
  deleteFunction,
  deleteMetadata,
  deleteSearchComponent,
  listDataField,
  listFunctionByMetadataId,
  listSearchComponent,
  oneTouchAccess,
  queryGangedDropdownByFunction,
  queryGangedDropdownByMasterField,
  updateDataField,
  updateSearchComponent,
}
