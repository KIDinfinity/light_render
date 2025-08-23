
import request from '@/utils/request';

export async function addOnCurrentEnv(params?: any, option?: any): Promise<any> {
  return request('/api/c360/integrationSwitch/addOnCurrentEnv', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteOnCurrentEnv(params?: any, option?: any): Promise<any> {
  return request('/api/c360/integrationSwitch/deleteOnCurrentEnv', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllSwitchConfig(params?: any, option?: any): Promise<any> {
  return request('/api/c360/integrationSwitch/findAllSwitchConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findOnCurrentEnv(params?: any, option?: any): Promise<any> {
  return request('/api/c360/integrationSwitch/findOnCurrentEnv', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCurrentActiveEnv(params?: any, option?: any): Promise<any> {
  return request('/api/c360/integrationSwitch/getCurrentActiveEnv', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateOnCurrentEnv(params?: any, option?: any): Promise<any> {
  return request('/api/c360/integrationSwitch/updateOnCurrentEnv', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addOnCurrentEnv,
  deleteOnCurrentEnv,
  findAllSwitchConfig,
  findOnCurrentEnv,
  getCurrentActiveEnv,
  updateOnCurrentEnv,
}
