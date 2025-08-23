
import request from '@/utils/request';

export async function archive(params?: any, option?: any): Promise<any> {
  return request('/api/mc/chat/archive', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cleanUnread(params?: any, option?: any): Promise<any> {
  return request('/api/mc/chat/cleanUnread', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getByMsgCount(params?: any, option?: any): Promise<any> {
  return request('/api/mc/chat/getByMsgCount', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getBySessionId(params?: any, option?: any): Promise<any> {
  return request('/api/mc/chat/getBySessionId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function text(params?: any, option?: any): Promise<any> {
  return request('/api/mc/chat/text', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  archive,
  cleanUnread,
  getByMsgCount,
  getBySessionId,
  text,
}
