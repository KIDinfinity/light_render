
import request from '@/utils/request';

export async function sendOds2RcsSync(params?: any, option?: any): Promise<any> {
  return request('/api/integration/Sync/sendOds2RcsSync', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  sendOds2RcsSync,
}
