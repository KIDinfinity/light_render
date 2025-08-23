
import request from '@/utils/request';

export async function countAllUserTaskVolume(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/countAllUserTaskVolume', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function countTasks(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/countTasks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAATaskInOneCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/findAATaskInOneCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findGatheringActivity(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/findGatheringActivity', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLatestTaskByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/findLatestTaskByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findTasksByCategory(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/findTasksByCategory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/getTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTaskByClaimNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/listTaskByClaimNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTaskByPolicyNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/listTaskByPolicyNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTaskDetailByCaseNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/listTaskDetailByCaseNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTaskPendInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/task/listTaskPendInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  countAllUserTaskVolume,
  countTasks,
  findAATaskInOneCase,
  findGatheringActivity,
  findLatestTaskByCaseNo,
  findTasksByCategory,
  getTask,
  listTaskByClaimNos,
  listTaskByPolicyNo,
  listTaskDetailByCaseNos,
  listTaskPendInfo,
}
