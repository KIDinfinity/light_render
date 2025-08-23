
import request from '@/utils/request';

export async function getParamData(params?: any, option?: any): Promise<any> {
  return request('/api/evy/template/getParamData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getParamData,
}
