import { stringify } from 'qs';
import request from '@/utils/request';

export async function getAllConfigTableStatistic(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/getAllConfigTableStatistic', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getConfigData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/getConfigData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getConfigTableIds(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/getConfigTableIds', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getConfigTableStatistic(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/getConfigTableStatistic', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resetConfigTableMetadata(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/inspection/resetConfigTableMetadata?${stringify(params)}`, {
    ...option,
  });
}

export async function getOnlineCheckList(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/getOnlineCheckList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function addOnlineCheckList(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/addOnlineCheckList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateOnlineCheckList(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/updateOnlineCheckList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteOnlineCheck(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/deleteOnlineCheck', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function backupFromOnlineData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/backupFromOnlineData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function backupFromExcelData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/backupFromExcelData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getBackupDataCompareResult(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/getBackupDataCompareResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function scanConfigTableList(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/scanConfigTableList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDbNameList(params?: any, option?: any): Promise<any> {
  return request('/api/cc/inspection/getDbNameList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getAllConfigTableStatistic,
  getConfigData,
  getConfigTableIds,
  getConfigTableStatistic,
  resetConfigTableMetadata,
  getOnlineCheckList,
  addOnlineCheckList,
  updateOnlineCheckList,
  deleteOnlineCheck,
  backupFromOnlineData,
  backupFromExcelData,
  getBackupDataCompareResult,
  scanConfigTableList,
  getDbNameList,
};
