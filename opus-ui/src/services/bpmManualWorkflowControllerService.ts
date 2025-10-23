
import request from '@/utils/request';

export async function getManuallyWorkflow(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/manual/workflow/getManuallyWorkflow', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getManuallyWorkflow,
}
