
import request from '@/utils/request';

export async function deleteDeployment(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/deployments/deleteDeployment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDeployment(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/deployments/getDeployment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function upload(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/deployments/upload', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  deleteDeployment,
  getDeployment,
  upload,
}
