
import request from '@/utils/request';

export async function update(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/partyId/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  update,
}
