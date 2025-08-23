
import request from '@/utils/request';

export async function fireFightingSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/integration/exceptionHandling/fireFightingSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getErrorCodeByCategory(params?: any, option?: any): Promise<any> {
  return request('/api/integration/exceptionHandling/getErrorCodeByCategory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getExceptionHandlingData(params?: any, option?: any): Promise<any> {
  return request('/api/integration/exceptionHandling/getExceptionHandlingData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProcessDetail(params?: any, option?: any): Promise<any> {
  return request('/api/integration/exceptionHandling/getProcessDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function identificationSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/integration/exceptionHandling/identificationSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  fireFightingSubmit,
  getErrorCodeByCategory,
  getExceptionHandlingData,
  getProcessDetail,
  identificationSubmit,
}
