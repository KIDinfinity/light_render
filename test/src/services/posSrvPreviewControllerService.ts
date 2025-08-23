import request from '@/utils/request';

export async function getSrvReviewCaseInfo(params?: any, option?: any): Promise<any> {
  return request('/api/srv/srvPreview/getSrvReviewCaseInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getIndicatorBySrvNo(params?: any, option?: any): Promise<any> {
  return request('/api/srv/getIndicatorBySrvNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkReassessButtonStatus(params?: any, option?: any): Promise<any> {
  return request('/api/srv/checkReassessButtonStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getSrvReviewCaseInfo,
  getIndicatorBySrvNo,
  checkReassessButtonStatus,
};
