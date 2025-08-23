import request from '@/utils/request';

export async function advSearch(params?: any, option?: any): Promise<any> {
  return request('/api/dw/task/advSearch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function beAssignTaskList(params?: any, option?: any): Promise<any> {
  return request('/api/dw/task/beAssignTaskList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function completes(params?: any, option?: any): Promise<any> {
  return request('/api/dw/task/completes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function favorites(params?: any, option?: any): Promise<any> {
  return request('/api/dw/task/favorites', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function priorities(params?: any, option?: any): Promise<any> {
  return request('/api/dw/task/priorities', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batchAssignDropDown(params?: any, option?: any): Promise<any> {
  return request('/api/dw/task/batchAssignDropDown', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function validationBatchAssignTask(params?: any, option?: any): Promise<any> {
  return request('/api/dw/task/validationBatchAssignTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export default {
  advSearch,
  beAssignTaskList,
  completes,
  favorites,
  priorities,
  batchAssignDropDown,
  validationBatchAssignTask,
};
