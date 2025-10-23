import { tenant } from '@/components/Tenant';
import request from '@/utils/request';
import { BusinessCode } from 'claim/enum/BusinessCode';

export async function addLeave(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leave/addLeave', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteLeave(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leave/deleteLeave', {
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

export async function getLeaveDuration(params?: any, option?: any): Promise<any> {
  // 当前泰国只有NB，日本只有Claim，bizCode分别对应BIZ003和BIZ001，因为泰国和日本分了两套代码，方便维护考虑暂时在这加入参数
  const businessCode = tenant.isTH()
    ? BusinessCode.nb
    : tenant.isJP()
    ? BusinessCode.claim
    : undefined;

  return request('/api/uc/leave/duration', {
    ...option,
    method: 'POST',
    body: { businessCode, ...params },
  });
}

export async function leaveOverview(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leave/overview', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateLeave(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leave/updateLeave', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getResources(params?: any, option?: any): Promise<any> {
  return request('/api/uc/leave/getResourceCount', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addLeave,
  deleteLeave,
  findLeavePage,
  getLeaveDuration,
  leaveOverview,
  updateLeave,
  getResources,
};
