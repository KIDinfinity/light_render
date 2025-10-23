
import { stringify } from 'qs';
import request from '@/utils/request';

export async function startClaimCaseMigration(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/startClaimCaseMigration?${stringify(params)}`, {
    ...option,
  });
}

export async function startClaimCaseMigrationByClaimNo(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/startClaimCaseMigrationByClaimNo?${stringify(params)}`, {
    ...option,
  });
}

export default {
  startClaimCaseMigration,
  startClaimCaseMigrationByClaimNo,
}
