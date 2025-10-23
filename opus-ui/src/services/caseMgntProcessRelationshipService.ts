
import request from '@/utils/request';

export async function findProcessRelationship(params?: any, option?: any): Promise<any> {
  return request('/api/case/mgnt/relationship/findProcessRelationship', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findProcessRelationship,
}
