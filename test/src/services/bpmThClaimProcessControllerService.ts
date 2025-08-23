
import { stringify } from 'qs';
import request from '@/utils/request';

export async function checkCanRevert(params?: any, option?: any): Promise<any> {
  return request(`/api/bpm/claim/process/checkCanRevert?${stringify(params)}`, {
    ...option,
  });
}

export async function endCaseByCaseNo(params?: any, option?: any): Promise<any> {
  return request(`/api/bpm/claim/process/endCaseByCaseNo?${stringify(params)}`, {
    ...option,
  });
}

export async function revert(params?: any, option?: any): Promise<any> {
  return request(`/api/bpm/claim/process/revert?${stringify(params)}`, {
    ...option,
  });
}

export async function triggerApprovedCaseDailyEndJob(params?: any, option?: any): Promise<any> {
  return request(`/api/bpm/claim/process/triggerApprovedCaseDailyEndJob?${stringify(params)}`, {
    ...option,
  });
}

export default {
  checkCanRevert,
  endCaseByCaseNo,
  revert,
  triggerApprovedCaseDailyEndJob,
}
