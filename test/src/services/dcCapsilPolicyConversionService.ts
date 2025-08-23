
import { stringify } from 'qs';
import request from '@/utils/request';

export async function backupClaimHistory(params?: any, option?: any): Promise<any> {
  return request('/api/dc/conversion/backupClaimHistory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function backupSnapshot(params?: any, option?: any): Promise<any> {
  return request('/api/dc/conversion/backupSnapshot', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function createAndDownLoadClaimZip(params?: any, option?: any): Promise<any> {
  return request(`/api/dc/conversion/createAndDownLoadClaimZip?${stringify(params)}`, {
    ...option,
  });
}

export async function createAndDownLoadFlowableZip(params?: any, option?: any): Promise<any> {
  return request(`/api/dc/conversion/createAndDownLoadFlowableZip?${stringify(params)}`, {
    ...option,
  });
}

export async function createAndDownLoadIntegrationZip(params?: any, option?: any): Promise<any> {
  return request(`/api/dc/conversion/createAndDownLoadIntegrationZip?${stringify(params)}`, {
    ...option,
  });
}

export async function createAndDownLoadZip(params?: any, option?: any): Promise<any> {
  return request(`/api/dc/conversion/createAndDownLoadZip?${stringify(params)}`, {
    ...option,
  });
}

export async function doConversion(params?: any, option?: any): Promise<any> {
  return request(`/api/dc/conversion/doConversion?${stringify(params)}`, {
    ...option,
  });
}

export async function doConversionByRange(params?: any, option?: any): Promise<any> {
  return request(`/api/dc/conversion/doConversionByRange?${stringify(params)}`, {
    ...option,
  });
}

export async function downLoadConvertZip(params?: any, option?: any): Promise<any> {
  return request(`/api/dc/conversion/downLoadConvertZip?${stringify(params)}`, {
    ...option,
  });
}

export async function dropBackupCollection(params?: any, option?: any): Promise<any> {
  return request('/api/dc/conversion/dropBackupCollection', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listClaimHistoryByConvertFlag(params?: any, option?: any): Promise<any> {
  return request('/api/dc/conversion/listClaimHistoryByConvertFlag', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function policyNoCapsil(params?: any, option?: any): Promise<any> {
  return request(`/api/dc/conversion/policyNoCapsil?${stringify(params)}`, {
    ...option,
  });
}

export async function recoverClaimHistoryFromBackup(params?: any, option?: any): Promise<any> {
  return request('/api/dc/conversion/recoverClaimHistoryFromBackup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function recoverSnapshotFromBackup(params?: any, option?: any): Promise<any> {
  return request('/api/dc/conversion/recoverSnapshotFromBackup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resetClaimHistoryByConvertFlag(params?: any, option?: any): Promise<any> {
  return request('/api/dc/conversion/resetClaimHistoryByConvertFlag', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resetSnapShotByConvertFlag(params?: any, option?: any): Promise<any> {
  return request('/api/dc/conversion/resetSnapShotByConvertFlag', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateC360SideBarInfo(params?: any, option?: any): Promise<any> {
  return request('/api/dc/conversion/updateC360SideBarInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateClaimHistoryByCapsilInfo(params?: any, option?: any): Promise<any> {
  return request('/api/dc/conversion/updateClaimHistoryByCapsilInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateSnapshotByCapsilInfo(params?: any, option?: any): Promise<any> {
  return request('/api/dc/conversion/updateSnapshotByCapsilInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  backupClaimHistory,
  backupSnapshot,
  createAndDownLoadClaimZip,
  createAndDownLoadFlowableZip,
  createAndDownLoadIntegrationZip,
  createAndDownLoadZip,
  doConversion,
  doConversionByRange,
  downLoadConvertZip,
  dropBackupCollection,
  listClaimHistoryByConvertFlag,
  policyNoCapsil,
  recoverClaimHistoryFromBackup,
  recoverSnapshotFromBackup,
  resetClaimHistoryByConvertFlag,
  resetSnapShotByConvertFlag,
  updateC360SideBarInfo,
  updateClaimHistoryByCapsilInfo,
  updateSnapshotByCapsilInfo,
}
