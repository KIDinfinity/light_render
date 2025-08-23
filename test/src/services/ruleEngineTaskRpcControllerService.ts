
import request from '@/utils/request';

export async function autoAssignForDBSet(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/autoAssignment/autoAssignForDBSet', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateMonitorInfoBySessionId(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/monitor/updateMonitorInfoBySessionId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function assembleAssignMethodInfo2(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/task/assembleAssignMethodInfo2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function autoPend(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/task/autoPend', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function autoUnPend(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/task/autoUnPend', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function autoUnPendForJp(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/task/autoUnPendForJp', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function autoUnPendForSubCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/task/autoUnPendForSubCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function calculateProcessColor(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/task/calculateProcessColor', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function scoreForPrioritizedTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/task/scoreForPrioritizedTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  autoAssignForDBSet,
  updateMonitorInfoBySessionId,
  assembleAssignMethodInfo2,
  autoPend,
  autoUnPend,
  autoUnPendForJp,
  autoUnPendForSubCase,
  calculateProcessColor,
  scoreForPrioritizedTask,
}
