
import request from '@/utils/request';

export async function submitCase(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/cases/docDispatch/submitCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  submitCase,
}
