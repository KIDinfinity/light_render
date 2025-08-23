import request from '@/utils/request';

export async function teamSummary(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/teamSummary', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function findTeamAllCases(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/findTeamAllCases', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function findTask(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/findTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function myTasksSummary(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/myTasksSummary', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findTodoCases(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/findTodoCases', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function findPendingCases(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/findPendingCases', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getFilter(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/getFilter', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function findDropdownList(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/findDropdownList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getSlaPercentage(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/calSlaPercentage', {
    ...option,
    method: 'POST',
  });
}
export async function commonSearch(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/commonSearch', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function quickSearch(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/quickSearch', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function commonSearchExport(params?: any, option?: any): Promise<any> {
  return request('/api/dw/dashboard/commonSearchExport', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  teamSummary,
  findTeamAllCases,
  findTask,
  myTasksSummary,
  findTodoCases,
  findPendingCases,
  getFilter,
  findDropdownList,
  getSlaPercentage,
  quickSearch,
  commonSearch,
  commonSearchExport,
};
