import request from '@/utils/request';

export async function activateReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/evy/activateReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batchActivateReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/evy/batchActivateReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findReasonInfo(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/evy/findReasonInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function findReasonInfoByInquiryBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/evy/findReasonInfoByInquiryBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resolveReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/evy/resolveReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendReminder(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/evy/sendReminder', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updatePendingMemoStatus(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/evy/updatePendingMemoStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function waiveReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/evy/waiveReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  activateReasonGroup,
  batchActivateReasonGroup,
  findReasonInfo,
  resolveReasonGroup,
  sendReminder,
  updatePendingMemoStatus,
  waiveReasonGroup,
  findReasonInfoByInquiryBusinessNo,
};
