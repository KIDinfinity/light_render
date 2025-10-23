
import request from '@/utils/request';

export async function initialMigration(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dataMigration/jp/initialMigration', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  initialMigration,
}
