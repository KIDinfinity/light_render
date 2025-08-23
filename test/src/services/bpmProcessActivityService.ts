import request from '@/utils/request';

export async function findActivitiesByCaseCategory(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/activity/findActivitiesByCaseCategory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listActivityByCaseCategory(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/activity/listActivityByCaseCategory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listActivityByCaseCategoryV2(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/activity/listActivityByCaseCategory/v2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listProcessAct(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/activity/listProcessAct', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listProcessActByProcDefIds(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/activity/listProcessActByProcDefIds', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function lsActivitySLA(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/lsActivitySLA', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAutoActivitiesByCaseCategory(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/activity/findAutoActivitiesByCaseCategory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findActivitiesByCaseCategory,
  listActivityByCaseCategory,
  listProcessAct,
  listProcessActByProcDefIds,
  lsActivitySLA,
  findAutoActivitiesByCaseCategory,
};
