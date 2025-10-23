
import request from '@/utils/request';

export async function log4claim(params?: any, option?: any): Promise<any> {
  return request('/api/lc/tat/log4claim', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function log4cm(params?: any, option?: any): Promise<any> {
  return request('/api/lc/tat/log4cm', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function simpleLog(params?: any, option?: any): Promise<any> {
  return request('/api/lc/tat/simpleLog', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  log4claim,
  log4cm,
  simpleLog,
}
