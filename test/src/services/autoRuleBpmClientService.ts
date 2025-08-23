import request from '@/utils/request';

export async function findByBusinessNoAndCastCategory(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findByBusinessNoAndCastCategory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLatesTaskByInquiryBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findLatesTaskByInquiryBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findTaskListByProcInstId(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findTaskListByProcInstId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLastAssigneeOfSameActivity(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getLastAssigneeOfSameActivity', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTaskByClaimNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listTaskByClaimNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTaskByPolicyNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listTaskByPolicyNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listUsersWithCurrentTaskAmount(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listUsersWithCurrentTaskAmount', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listUsersWithTotalTaskAmount(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/listUsersWithTotalTaskAmount', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findByBusinessNoAndCastCategory,
  findLatesTaskByInquiryBusinessNo,
  findTaskListByProcInstId,
  getLastAssigneeOfSameActivity,
  listTaskByClaimNos,
  listTaskByPolicyNo,
  listUsersWithCurrentTaskAmount,
  listUsersWithTotalTaskAmount,
};
