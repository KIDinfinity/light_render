import request from '@/utils/request';

export async function cancel(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leaveRequest/cancel', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function discardUserLeaveRequestDetail(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leaveRequest/discardUserLeaveRequestDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLeaveRequestUserInfo(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leaveRequest/getLeaveRequestUserInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPersonalLeaveRequestInfo(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leaveRequest/getPersonalLeaveRequestInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getTeamLeaveRequestInfo(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leaveRequest/getTeamLeaveRequestInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getUserClassifiedLeaveRequestInfo(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leaveRequest/getUserClassifiedLeaveRequestInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getUserDraftLeaveRequest(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leaveRequest/getUserDraftLeaveRequest', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getUserLeaveRequestByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leaveRequest/getUserLeaveRequestByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reject(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leaveRequest/reject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leaveRequest/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function waivePersonalLeaveRequest(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leaveRequest/waivePersonalLeaveRequest', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function overview(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leave/overview', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLeavePage(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leave/findLeavePage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findTaskCountMemberList(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leave/findTaskCountMemberList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cancel,
  discardUserLeaveRequestDetail,
  getLeaveRequestUserInfo,
  getPersonalLeaveRequestInfo,
  getTeamLeaveRequestInfo,
  getUserClassifiedLeaveRequestInfo,
  getUserDraftLeaveRequest,
  getUserLeaveRequestByCaseNo,
  reject,
  submit,
  waivePersonalLeaveRequest,
  overview,
  findLeavePage,
  findTaskCountMemberList,
};
