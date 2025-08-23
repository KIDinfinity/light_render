import request from '@/utils/request';

export async function FileToBase64(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/FileToBase64', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function downloadReport(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/downloadReport', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function downloadReportPDF(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/downloadReportPDF', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function downloadReportFromCache(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/downloadReportFromCache', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function preViewReportPDF(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/preViewReportPDF', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendReport(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/sendReport', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  FileToBase64,
  downloadReport,
  downloadReportPDF,
  preViewReportPDF,
  sendReport,
};
