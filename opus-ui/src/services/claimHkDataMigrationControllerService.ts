
import { stringify } from 'qs';
import request from '@/utils/request';

export async function adHotMigration(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dataMigration/hk/adHotMigration', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getExclusiveClaimsByInsuredId(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dataMigration/hk/getExclusiveClaimsByInsuredId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initialMigration(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dataMigration/hk/initialMigration', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function setMigrationSwitch(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dataMigration/hk/setMigrationSwitch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function testRCSDataMigration(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/dataMigration/hk/testRCSDataMigration?${stringify(params)}`, {
    ...option,
  });
}

export default {
  adHotMigration,
  getExclusiveClaimsByInsuredId,
  initialMigration,
  setMigrationSwitch,
  testRCSDataMigration,
}
