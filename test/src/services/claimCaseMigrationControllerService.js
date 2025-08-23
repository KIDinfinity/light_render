import { stringify } from 'qs';
import request from '@/utils/request';

export async function startClaimCaseMigration(params) {
  return request(`/api/claim/startClaimCaseMigration?${stringify(params)}`);
}

export async function startClaimCaseMigrationByClaimNo(params) {
  return request(`/api/claim/startClaimCaseMigrationByClaimNo?${stringify(params)}`);
}

export default {
  startClaimCaseMigration,
  startClaimCaseMigrationByClaimNo,
};
