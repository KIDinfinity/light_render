import request from '@/utils/request';

export async function add(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/add', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function addAndPatch(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/addAndPatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function addDataVersion(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/addDataVersion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteBatch(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/deleteBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteBatchAndPatch(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/deleteBatchAndPatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteDataVersion(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/deleteDataVersion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteDraftVersion(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/deleteDraftVersion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function exportData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/exportData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function exportTemplate(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/exportTemplate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function importData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/importData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function asyncImportData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/asyncImportData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function importDataAndPatch(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/importDataAndPatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function importDataByVersion(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/importDataByVersion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function importSqlScript(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/importSqlScript', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initDataVersion(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/initDataVersion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listPage(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/query/listPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryDataVersions(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/queryDataVersions', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateAndPatch(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/updateAndPatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateDataVersion(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/updateDataVersion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function download(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/data/download', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  add,
  addAndPatch,
  addDataVersion,
  deleteBatch,
  deleteBatchAndPatch,
  deleteDataVersion,
  deleteDraftVersion,
  exportData,
  exportTemplate,
  importData,
  asyncImportData,
  importDataAndPatch,
  importDataByVersion,
  importSqlScript,
  initDataVersion,
  listPage,
  queryDataVersions,
  update,
  updateAndPatch,
  updateDataVersion,
  download,
};
