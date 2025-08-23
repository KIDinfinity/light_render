import { stringify } from 'qs';
import request from '@/utils/request';

export async function deleteFileList(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/deleteFileList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function downloadDoc(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/downloadDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function downloadDocStream(params?: any, option?: any): Promise<any> {
  return request(`/api/doc/management/downloadDocStream?${stringify(params)}`, {
    ...option,
  });
}

export async function ocrDocumentData(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/ocrDocumentData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retryUploadDoc(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/retryUploadDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function supplementDocFileName(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/supplementDocFileName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function syncDocView(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/syncDocView', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateDocInfo(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/updateDocInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function ByClaimNoAndDocId(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/updateDocReference/ByClaimNoAndDocId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function ByDocReferenceList(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/updateDocReference/ByDocReferenceList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateMandatoryDoc(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/updateMandatoryDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function uploadDocInfo(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/uploadDocInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function uploadFile(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/uploadFile', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkDocStatus(params?: any, option?: any): Promise<any> {
  return request(`/api/doc/management/checkDocStatus`, {
    ...option,
    method: 'POST',
    body: params,
  });
}
export default {
  deleteFileList,
  downloadDoc,
  downloadDocStream,
  ocrDocumentData,
  retryUploadDoc,
  supplementDocFileName,
  syncDocView,
  updateDocInfo,
  ByClaimNoAndDocId,
  ByDocReferenceList,
  updateMandatoryDoc,
  uploadDocInfo,
  uploadFile,
  checkDocStatus,
};
