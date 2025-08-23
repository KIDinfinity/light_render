
import request from '@/utils/request';

export async function listAllConfigurablePageInfo(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/configuration/listAllConfigurablePageInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listAllConfigurablePageInfo,
}
