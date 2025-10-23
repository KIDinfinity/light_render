
import request from '@/utils/request';

export async function readContent(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/contentService/readContent', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveContent(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/contentService/saveContent', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  readContent,
  saveContent,
}
