
import request from '@/utils/request';

export async function report(params?: any, option?: any): Promise<any> {
  return request('/api/rc/MongoReport/query/report', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  report,
}
