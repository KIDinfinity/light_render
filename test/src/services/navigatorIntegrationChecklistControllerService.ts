
import request from '@/utils/request';

export async function getIntegrationChecklist(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/getIntegrationChecklist`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getIntegrationChecklist,
}
