
import request from '@/utils/request';

export async function asynDisposRequest(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/serviceDowntimeConfig/asynDisposRequest', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function isMeetDowntime(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/serviceDowntimeConfig/isMeetDowntime', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  asynDisposRequest,
  isMeetDowntime,
}
