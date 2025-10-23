
import request from '@/utils/request';

export async function sqlLog(params?: any, option?: any): Promise<any> {
  return request('/api/claim/insert/sqlLog', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateSideBarByClaimNoAndInsuredId(params?: any, option?: any): Promise<any> {
  return request('/api/claim/sideBar/updateSideBarByClaimNoAndInsuredId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateSideBarClaimHistoryByInsuredId(params?: any, option?: any): Promise<any> {
  return request('/api/claim/sideBar/updateSideBarClaimHistoryByInsuredId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  sqlLog,
  updateSideBarByClaimNoAndInsuredId,
  updateSideBarClaimHistoryByInsuredId,
}
