import request from '@/utils/request';

export async function completeTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/common/completeTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function genDocId(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/common/genDocId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCustomerTypeConfig(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/common/getCustomerTypeConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startProcess(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/common/startProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function triggerExecution(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/common/triggerExecution', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateDayEndPauseTimeZone(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/common/updateDayEndPauseTimeZone', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateRcsAutoSubmissionFlag(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/common/updateRcsAutoSubmissionFlag', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAssigneeTaskSummary(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/common/getAssigneeTaskSummary', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  completeTask,
  genDocId,
  getCustomerTypeConfig,
  startProcess,
  triggerExecution,
  updateDayEndPauseTimeZone,
  updateRcsAutoSubmissionFlag,
  getAssigneeTaskSummary,
};
