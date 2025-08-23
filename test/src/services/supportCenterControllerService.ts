import request from '@/utils/request';

export async function handleRegionSwitch(params?: any, option?: any): Promise<any> {
  return request('/api/monitor/center/regionSwitch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function switchRegionWithLogin(params?: any, option?: any): Promise<any> {
  return request('/api/monitor/center/switchRegionWithLogin', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  handleRegionSwitch,
  switchRegionWithLogin,
};
