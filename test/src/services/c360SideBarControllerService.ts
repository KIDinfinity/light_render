
import request from '@/utils/request';

export async function getC360SideBarClaimHistoryList(params?: any, option?: any): Promise<any> {
  return request('/api/c360/sideBar/getC360SideBarClaimHistoryList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getMultipleOverallSideBarInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/sideBar/getMultipleOverallSideBarInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getOverallSideBarInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/sideBar/getOverallSideBarInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getSideBarProductBenefitInfoList(params?: any, option?: any): Promise<any> {
  return request('/api/c360/sideBar/getSideBarProductBenefitInfoList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getC360SideBarClaimHistoryList,
  getMultipleOverallSideBarInfo,
  getOverallSideBarInfo,
  getSideBarProductBenefitInfoList,
}
