
import request from '@/utils/request';

export async function cityInformation(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/cityInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cityInformation,
}
