
import request from '@/utils/request';

export async function hkMigration(params?: any, option?: any): Promise<any> {
  return request('/rpc/got/hkMigration', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function hkMigrationBatch(params?: any, option?: any): Promise<any> {
  return request('/rpc/got/hkMigrationBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function V2(params?: any, option?: any): Promise<any> {
  return request('/rpc/got/hkMigrationBatch/V2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  hkMigration,
  hkMigrationBatch,
  V2,
}
