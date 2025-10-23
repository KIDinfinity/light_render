
import request from '@/utils/request';

export async function migrateMainPageSnapshotData(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/datamigration/migrateMainPageSnapshotData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  migrateMainPageSnapshotData,
}
