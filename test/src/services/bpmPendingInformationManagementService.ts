import request from '@/utils/request';

export async function addPendingInfo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/addPendingInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function autoPend(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/autoPend', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function autoUnPend(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/autoUnPend', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkCancelNotice(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/checkCancelNotice', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deletePendingInfo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/deletePendingInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function executePendTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/executePendTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPendReason(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/getPendReason', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPendingInfoById(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/getPendingInfoById', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getSendDate(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/getSendDate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listCaseHistPendingInfo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/listCaseHistPendingInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listPendingFor(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/listPendingFor', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listTaskPendingInfo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/listTaskPendingInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reminderSwitch(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/reminderSwitch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resolvePendingInfo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/resolvePendingInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function savePendingInfo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/savePendingInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendPendingMessage(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/sendPendingMessage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendPendingReminder(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/sendPendingReminder', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function waivePendingInfo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/waivePendingInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function findAssigneeAndTeam(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/findAssigneeAndTeam', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export default {
  addPendingInfo,
  autoPend,
  autoUnPend,
  checkCancelNotice,
  deletePendingInfo,
  executePendTask,
  getPendReason,
  getPendingInfoById,
  getSendDate,
  listCaseHistPendingInfo,
  listPendingFor,
  listTaskPendingInfo,
  reminderSwitch,
  resolvePendingInfo,
  savePendingInfo,
  sendPendingMessage,
  sendPendingReminder,
  waivePendingInfo,
  findAssigneeAndTeam,
};
