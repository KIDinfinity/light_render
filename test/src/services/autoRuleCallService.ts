
import request from '@/utils/request';

export async function execute(params?: any, option?: any): Promise<any> {
  return request('/rpc/autoRule/execute', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAutoDecision(params?: any, option?: any): Promise<any> {
  return request('/rpc/autoRule/getAutoDecision', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCompleteTaskAssignee(params?: any, option?: any): Promise<any> {
  return request('/rpc/autoRule/getCompleteTaskAssignee', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCreateCaseAssignee(params?: any, option?: any): Promise<any> {
  return request('/rpc/autoRule/getCreateCaseAssignee', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAssigneeByGroup(params?: any, option?: any): Promise<any> {
  return request('/api/autoRule/getAssigneeByGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  execute,
  getAutoDecision,
  getCompleteTaskAssignee,
  getCreateCaseAssignee,
  getAssigneeByGroup
}
