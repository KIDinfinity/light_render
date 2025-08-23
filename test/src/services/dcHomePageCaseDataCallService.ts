import request from '@/utils/request';

export async function completes(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/completes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function completesDropDown(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/completesDropDown', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function countTaskByActivity(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/countTaskByActivity', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function countTaskByStatus(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/countTaskByStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function countTaskStatus(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/countTaskStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function favorites(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/favorites', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function favoritesDropDown(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/favoritesDropDown', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getErrorTasks(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/getErrorTasks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getOverDueTasks(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/getOverDueTasks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function priorities(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/priorities', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function prioritiesDropDown(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/prioritiesDropDown', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function unassign(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/unassign', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function unassignDropDown(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/unassignDropDown', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listBossModelProcess(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/homepage/listBossModelProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function groupTasksByReason(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/groupTasksByReason', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function groupTasksByChannel(params?: any, option?: any): Promise<any> {
  return request('/api/dc/homepage/groupTasksByChannel', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  completes,
  completesDropDown,
  countTaskByActivity,
  countTaskByStatus,
  countTaskStatus,
  favorites,
  favoritesDropDown,
  getErrorTasks,
  getOverDueTasks,
  priorities,
  prioritiesDropDown,
  unassign,
  unassignDropDown,
  listBossModelProcess,
  groupTasksByReason,
  groupTasksByChannel,
};
