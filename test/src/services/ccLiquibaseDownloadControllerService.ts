
import { stringify } from 'qs';
import request from '@/utils/request';

export async function downloadByData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/liquibase/downloadByData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function downloadByFileName(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/business/liquibase/downloadByFileName?${stringify(params)}`, {
    ...option,
  });
}

export async function downloadByQueryPage(params?: any, option?: any): Promise<any> {
  return request('/api/cc/business/liquibase/downloadByQueryPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function downloadForConfigTable(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/business/liquibase/downloadForConfigTable?${stringify(params)}`, {
    ...option,
  });
}

export async function queryAllFileList(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/business/liquibase/queryAllFileList?${stringify(params)}`, {
    ...option,
  });
}

export default {
  downloadByData,
  downloadByFileName,
  downloadByQueryPage,
  downloadForConfigTable,
  queryAllFileList,
}
