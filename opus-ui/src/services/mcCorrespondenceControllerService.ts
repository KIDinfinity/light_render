import request from '@/utils/request';
import { stringify } from 'qs';

export async function getCorrespondencePreviewAttachFile(params?: any, option?: any): Promise<any> {
  return request('/api/mc/correspondence/getCorrespondencePreviewAttachFile', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCrpdPreviewSimpleAttachFileList(params?: any, option?: any): Promise<any> {
  return request('/api/mc/correspondence/getCrpdPreviewSimpleAttachFileList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkPreviewAttachFileExist(params?: any, option?: any): Promise<any> {
  return request('/api/mc/correspondence/checkPreviewAttachFileExist', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function downloadCrpdPreviewAttachFile(params?: any, option?: any): Promise<any> {
  return request(`/api/mc/correspondence/downloadCrpdPreviewAttachFile?${stringify(params)}`, {
    ...option,
  });
}

export default {
  getCorrespondencePreviewAttachFile,
  getCrpdPreviewSimpleAttachFileList,
  checkPreviewAttachFileExist,
  downloadCrpdPreviewAttachFile,
};
