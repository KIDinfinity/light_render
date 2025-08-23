
import request from '@/utils/request';

export async function getOverallInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/client/getOverallInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateC360OverallInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/client/updateC360OverallInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updatePosHistory(params?: any, option?: any): Promise<any> {
  return request('/api/c360/client/updatePosHistory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getOverallInfo,
  updateC360OverallInfo,
  updatePosHistory,
}
