import { stringify } from 'qs';
import request from '@/utils/request';

export async function getLatestOcrException(params?: any, option?: any): Promise<any> {
  return request(`/api/doc/ocr/getLatestOcrException?${stringify(params)}`, {
    ...option,
  });
}
export async function getLatestOcrStatus(params?: any, option?: any): Promise<any> {
  return request(`/api/doc/ocr/getLatestOcrStatus?${stringify(params)}`, {
    ...option,
  });
}
export async function getOcrResultDetail(params?: any, option?: any): Promise<any> {
  return request(`/api/doc/ocr/getOcrResultDetail?${stringify(params)}`, {
    ...option,
  });
}
export async function triggerOCR(params?: any, option?: any): Promise<any> {
  return request('/api/doc/ocr/triggerOCR', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function exportReport(params?: any, option?: any): Promise<any> {
  return request('/api/doc/ocr/exportReport', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getLatestOcrException,
  getLatestOcrStatus,
  getOcrResultDetail,
  triggerOCR,
  exportReport,
};
